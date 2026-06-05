
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.routes import (
    project,
    pdfqa,
    chat
)

app = FastAPI()
app.mount(
    "/uploads",
    StaticFiles(directory="../uploads"),
    name="uploads"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(project.router)
app.include_router(pdfqa.router)
app.include_router(chat.router)
