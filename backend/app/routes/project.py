
from fastapi import APIRouter
from pydantic import BaseModel
from app.services.llm_service import ask_llm

router = APIRouter()

class ProjectRequest(BaseModel):
    domain: str

@router.post("/generate-project")
def generate_project(data: ProjectRequest):

    prompt = f"""
Generate 5 innovative AI/ML project ideas.

Domain:
{data.domain}

Rules:
- Use markdown formatting
- Use numbered points
- Mention:
  - Project Title
  - Short Explanation
- Keep response concise
- Beginner-friendly ideas

Example Format:

1. Project Title
   - Short explanation

2. Project Title
   - Short explanation
"""

    response = ask_llm(prompt)

    return {
        "response": response
    }
