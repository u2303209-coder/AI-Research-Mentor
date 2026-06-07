from fastapi import APIRouter
from pydantic import BaseModel
from app.services.llm_service import ask_llm
import httpx
import asyncio
import urllib.parse
import re

router = APIRouter()

class ProjectRequest(BaseModel):
    domain: str


# ── Fetch related papers from arXiv (completely free, no API key needed) ──
async def fetch_arxiv_papers(idea_title: str) -> list:
    try:
        query = idea_title.strip().split("\n")[0]
        query = " ".join(query.split()[:8])
        encoded = urllib.parse.quote(query)

        url = (
            f"https://export.arxiv.org/api/query"
            f"?search_query=all:{encoded}"
            f"&start=0&max_results=3"
            f"&sortBy=relevance&sortOrder=descending"
        )

        async with httpx.AsyncClient(timeout=10) as client:
            resp = await client.get(url)

        if resp.status_code != 200:
            return []

        import xml.etree.ElementTree as ET
        ns = "{http://www.w3.org/2005/Atom}"
        root = ET.fromstring(resp.text)

        papers = []
        for entry in root.findall(f"{ns}entry"):
            title   = entry.find(f"{ns}title")
            summary = entry.find(f"{ns}summary")
            link    = entry.find(f"{ns}id")
            if title is not None and link is not None:
                papers.append({
                    "title":   title.text.strip().replace("\n", " "),
                    "url":     link.text.strip(),
                    "snippet": summary.text.strip()[:160].replace("\n", " ") + "..."
                             if summary is not None else "",
                })
        return papers

    except Exception as e:
        print(f"arXiv fetch error: {e}")
        return []


# ── Parse LLM output — skip any block that has no project title (intro lines) ──
def parse_projects(raw: str) -> list:
    blocks = re.split(r'\n(?=\d+\.)', raw.strip())
    valid = []
    for b in blocks:
        b = b.strip()
        if not b:
            continue
        # Skip blocks that are just an intro sentence (no newline = single line, no title structure)
        lines = [l for l in b.split("\n") if l.strip()]
        if len(lines) < 2:
            continue
        valid.append(b)
    return valid


@router.post("/generate-project")
async def generate_project(data: ProjectRequest):

    prompt = f"""You are an AI project idea generator.

Generate exactly 7 innovative AI/ML project ideas for the domain below.
IMPORTANT: Do NOT write any introduction or opening sentence.
Start your response DIRECTLY with "1." and nothing else before it.
Avoid all markdown symbols like ** or ##.

Domain: {data.domain}

Use this exact format for each idea:

1. Project Title Here

Medium 4-5 line description of what the project does and why it is useful.
Difficulty: Beginner
Estimated Time Required: 3-4 weeks

2. Next Project Title

...continue until 7.
"""

    raw_response = ask_llm(prompt)

    project_blocks = parse_projects(raw_response)

    paper_tasks = [fetch_arxiv_papers(block) for block in project_blocks]
    all_papers  = await asyncio.gather(*paper_tasks)

    projects = [
        {"idea": block, "papers": papers}
        for block, papers in zip(project_blocks, all_papers)
    ]

    return {"projects": projects}
