from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel

from app.services.llm_service import ask_llm

import chromadb
from sentence_transformers import SentenceTransformer
import fitz

router = APIRouter()

# ---------------- CHROMADB ---------------- #

client = chromadb.PersistentClient(
    path="../chroma_db"
)

collection = client.get_or_create_collection(
    "pdfs"
)

# ---------------- EMBEDDING MODEL ---------------- #

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

# ---------------- REQUEST MODEL ---------------- #

class QuestionRequest(BaseModel):

    question: str


# ---------------- PDF UPLOAD ---------------- #

@router.post("/upload-pdf")
async def upload_pdf(
    file: UploadFile = File(...)
):

    path = f"../uploads/{file.filename}"

    with open(path, "wb") as f:

        f.write(await file.read())

    doc = fitz.open(path)

    # Clear old PDF

    existing = collection.get()

    if existing["ids"]:

        collection.delete(
            ids=existing["ids"]
        )

    documents = []
    embeddings = []
    ids = []
    metadatas = []

    chunk_size = 1000

    for page_num, page in enumerate(doc):

        page_text = page.get_text()

        if not page_text.strip():

            continue

        chunks = [

            page_text[i:i + chunk_size]

            for i in range(
                0,
                len(page_text),
                chunk_size
            )

        ]

        for chunk_id, chunk in enumerate(chunks):

            documents.append(chunk)

            embeddings.append(

                model.encode(
                    chunk
                ).tolist()

            )

            ids.append(

                f"{file.filename}_{page_num}_{chunk_id}"

            )

            metadatas.append({

                "page": page_num + 1,

                "source": file.filename

            })

    collection.add(

        documents=documents,

        embeddings=embeddings,

        ids=ids,

        metadatas=metadatas

    )

    return {

        "message":
        "PDF uploaded successfully"

    }


# ---------------- PDF QA ---------------- #

# ---------------- PDF QA ---------------- #

@router.post("/ask-pdf")
def ask_pdf(
    data: QuestionRequest
):

    try:

        query_embedding = model.encode(
            data.question
        ).tolist()

        question = data.question.lower()

        # ---------------- SMART RETRIEVAL ---------------- #

        if " and " in question:

            n_results = 8

        elif question.startswith(

            (
                "what is",
                "define",
                "meaning of",
                "who is",
                "when is",
                "where is"
            )

        ):

            n_results = 3

        else:

            n_results = 5

        results = collection.query(

            query_embeddings=[
                query_embedding
            ],

            n_results=n_results

        )

        documents = results["documents"][0]

        metadatas = results["metadatas"][0]

        if not documents:

            return {

                "response":
                "No relevant information found in the PDF."

            }

        # ---------------- DEBUG ---------------- #

        print("\n====================")
        print("RETRIEVED CHUNKS")
        print("====================")

        for i, doc in enumerate(documents):

            print(f"\nChunk {i+1}\n")

            print(doc[:300])

        # ---------------- CONTEXT ---------------- #

        context = "\n\n".join(
            documents
        )

        prompt = f"""
You are an academic research assistant.

Answer ONLY using the PDF context.

Rules:

- Use bullet points.
- Start directly with the answer.
- No introductions.
- No conclusions.
- No phrases like:
  "Here is the answer"
  "I hope this helps"
  "Based on the PDF"

- If the question asks about multiple concepts,
  answer each concept separately.

- Never say something is not mentioned in the PDF
  unless it is genuinely absent from the provided context.

- Do not use outside knowledge.

- If information is missing, say:
  Information not found in PDF.

- Use professional academic language.

PDF Context:

{context}

Question:

{data.question}
"""

        response = ask_llm(
            prompt
        )

        # ---------------- SOURCES ---------------- #

        pages = []

        for meta in metadatas:

            page = meta["page"]

            if page not in pages:

                pages.append(page)

        # Sort pages

        pages = sorted(pages)

        # Keep only top 2 most relevant pages

        pages = pages[:2]

        if pages:

            response += "\n\n📚 Sources\n\n"

            for page in pages:

                response += f"• Page {page}\n"

        return {

            "response": response

        }

    except Exception as e:

        print(

            "PDF QA ERROR:",
            str(e)

        )

        return {

            "response":
            f"Error: {str(e)}"

        }