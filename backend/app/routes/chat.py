from fastapi import APIRouter
from pydantic import BaseModel

from app.services.llm_service import ask_llm

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
def chat(data: ChatRequest):

    prompt = f"""
You are answering questions related to:
- Artificial Intelligence
- Machine Learning
- Deep Learning
- Generative AI
- NLP
- Data Science

Answer the following question accurately.

Rules:
- Use markdown bullet points
- Keep answers concise
- Use standard AI/ML terminology
- Beginner-friendly explanation
- Avoid hallucinations

Question:
{data.message}

Example Format:

- Point 1
- Point 2
- Point 3
"""

    response = ask_llm(prompt)

    return {
        "response": response
    }