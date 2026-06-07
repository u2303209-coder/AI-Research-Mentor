from fastapi import APIRouter
from pydantic import BaseModel

from app.services.llm_service import ask_llm

router = APIRouter()




class ChatRequest(BaseModel):
    messages: list

@router.post("/chat")
def chat(data: ChatRequest):

    # BUILD CONVERSATION HISTORY

    conversation = ""

    for msg in data.messages:

        role = msg["role"]

        content = msg["content"]

        if role == "user":

            conversation += f"User: {content}\n"

        else:

            conversation += f"Assistant: {content}\n"


    # PROMPT

    prompt = f"""
You are a smart AI assistant specialized in:

- Artificial Intelligence
- Machine Learning
- Deep Learning
- NLP
- Data Science
- Generative AI
-Strictly avoid markdown symbols like ** or ## in your responses always.

Guidelines:
- Answer naturally like ChatGPT
- Maintain conversation continuity
- Be conversational and professional
- Beginner-friendly explanations
- Keep responses concise but meaningful
- Use bullet points whenever suitable
- Strictly Avoid markdown symbols like ** or ##
- Avoid huge paragraphs
- Explain technical topics in simple terms
- Respond intelligently according to context

Conversation:
{conversation}

Assistant:
"""

    

    response = ask_llm(prompt)

    return {
        "response": response
    }