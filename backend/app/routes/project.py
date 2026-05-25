from fastapi import APIRouter
from pydantic import BaseModel

from app.services.llm_service import ask_llm

router = APIRouter()


# ---------------- REQUEST MODEL ---------------- #

class ProjectRequest(BaseModel):
    domain: str


# ---------------- GENERATE PROJECTS ---------------- #

@router.post("/generate-project")
def generate_project(data: ProjectRequest):

    prompt = f"""
You are an AI project idea generator.

Generate 5 innovative AI/ML project ideas.

Domain:
{data.domain}

Guidelines:
- Use numbered formatting
- Each idea must contain:
  1. Project Title
  2. 2-3 line explanation
- Keep explanations concise but meaningful
- Beginner-friendly
- Avoid huge paragraphs
- Avoid markdown symbols like ** or ##
- Make ideas practical and modern
- Keep the response clean and professional

Example Format:

1. AI Resume Analyzer

Analyzes resumes using NLP and ranks candidates based on required skills.
Helps recruiters automate hiring and reduce manual screening effort.

2. Smart Healthcare Assistant

Predicts diseases from symptoms using Machine Learning models.
Provides healthcare guidance and improves patient support.
"""

    response = ask_llm(prompt)

    return {
        "response": response
    }