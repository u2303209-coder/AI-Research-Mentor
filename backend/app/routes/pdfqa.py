from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel

from app.services.llm_service import ask_llm

import chromadb
from sentence_transformers import SentenceTransformer
import fitz

router = APIRouter()

# ChromaDB

client = chromadb.PersistentClient(
    path="../chroma_db"
)

collection = client.get_or_create_collection(
    "pdfs"
)

# Embedding Model

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

# Request Model

class QuestionRequest(BaseModel):
    question: str

# Upload PDF

@router.post("/upload-pdf")
async def upload_pdf(
    file: UploadFile = File(...)
):

    path = f"../uploads/{file.filename}"

    # Save PDF

    with open(path, "wb") as f:
        f.write(await file.read())

    # Extract Text Using PyMuPDF

    doc = fitz.open(path)

    text = ""

    for page in doc:
        text += page.get_text()

    # Better Chunking

    chunk_size = 1000

    chunks = [

        text[i:i + chunk_size]

        for i in range(
            0,
            len(text),
            chunk_size
        )

    ]

    # Store Embeddings

    for i, chunk in enumerate(chunks):

        embedding = model.encode(
            chunk
        ).tolist()

        collection.add(

            documents=[chunk],

            embeddings=[embedding],

            ids=[
                f"{file.filename}_{i}"
            ]

        )

    return {
        "message":
        "PDF uploaded successfully"
    }

# Ask Questions

@router.post("/ask-pdf")
def ask_pdf(data: QuestionRequest):

    # Convert Question to Embedding

    query_embedding = model.encode(
        data.question
    ).tolist()

    # Retrieve Similar Chunks

    results = collection.query(

        query_embeddings=[
            query_embedding
        ],

        n_results=5

    )

    # Combine Context

    context = " ".join(
        results["documents"][0]
    )

    # Better RAG Prompt

    prompt = f"""
You are an AI research assistant.

Answer ONLY using the PDF context below.

VERY IMPORTANT RULES:
- ALWAYS answer in bullet points
- NEVER write long paragraphs
- Keep each point short
- Maximum 6 bullet points
- Use simple beginner-friendly language
- Be accurate to the PDF
- If information is missing, say:
  "Information not found in PDF."

PDF Context:
{context}

Question:
{data.question}

Format Example:
• Point 1
• Point 2
• Point 3
"""

    response = ask_llm(prompt)

    return {
        "answer": response
    }