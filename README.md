Research Mentor AI

An AI-powered platform that combines:
- Conversational AI Chatbot
- PDF Question Answering using RAG
- AI/ML Project Idea Generation

Built using React.js, FastAPI, Ollama (Llama 3), ChromaDB, and Sentence Transformers.



 Features

 AI Chatbot
- Conversational ChatGPT-like interface
- Continuous chat support
- AI-powered technical explanations
- Beginner-friendly responses
- Modern professional UI

 PDF Question Answering (RAG)
- Upload research papers or PDFs
- Ask context-aware questions
- Retrieval-Augmented Generation (RAG)
- Semantic search using embeddings
- Bullet-point formatted answers

 AI Project Generator
- Generate innovative AI/ML project ideas
- Domain-based project suggestions
- Includes explanations for each project
- Useful for students and beginners



 Tech Stack

Frontend
- React.js
- React Router
- Axios
- Lucide React Icons

 Backend
- FastAPI
- Ollama
- Llama 3
- ChromaDB
- Sentence Transformers
- PyMuPDF


Installation

 1. Clone Repository

bash
git clone <your-repository-url>




 2. Backend Setup

bash
cd backend


Create virtual environment:

bash
python -m venv venv


Activate virtual environment (Windows):

bash
venv\Scripts\activate


Install dependencies:

bash
pip install -r requirements.txt


Run backend:

bash
uvicorn app.main:app --reload



 3. Frontend Setup

Open another terminal:

bash
cd frontend


Install dependencies:

bash
npm install


Run frontend:

bash
npm run dev




 Ollama Setup

Install Ollama:

https://ollama.com

Run Llama 3 model:

bash
ollama run llama3



 Example Test Cases

 Chatbot
- What is Machine Learning?
- Explain NLP in simple terms
- What are applications of Deep Learning?

 PDF QA
Upload a research paper and ask:
- What is the main objective?
- What methodology is used?
- What are the results?

 Project Generator
Try domains like:
- NLP
- Computer Vision
- Healthcare AI
- Generative AI

Future Improvements

- User Authentication
- Chat History Storage
- Dark Mode
- Multiple PDF Uploads
- Voice Assistant Integration
- Streaming AI Responses
- Cloud Deployment

 Project Objective

The objective of Research Mentor AI is to help students, beginners, and researchers interact with AI tools through:
- intelligent conversations,
- research paper understanding,
- and innovative project idea generation.

 Author

Developed by Sooraj S as an AI/ML project during my internship at Nest CyberCampus.
For any queries mail:soorajs.0805@gmail.com
