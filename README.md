Research Mentor AI

An AI-powered research platform built for students, beginners, and researchers — combining a conversational chatbot, PDF question answering via RAG, and an AI/ML project idea generator with real research paper links.

---

Live Features

AI Chatbot
A conversational interface for technical Q&A on AI, ML, and NLP topics. Supports continuous multi-turn conversations with beginner-friendly explanations.

PDF Question Answering (RAG)
Upload any research paper and ask context-aware questions. Uses Retrieval-Augmented Generation with semantic search to retrieve the most relevant content before generating an answer.

AI Project Generator
Enter a research domain and receive fully-scoped AI/ML project ideas — each paired with real research paper links fetched live from arXiv.

---
 Prerequisites
- Python 3.9+
- Node.js 18+
- [Ollama](https://ollama.com) installed and running

---

 1. Clone the Repository

```bash
git clone <your-repository-url>
cd research-mentor-ai
```

 2. Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the backend server
uvicorn app.main:app --reload
```

Backend runs at `http://127.0.0.1:8000`

 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend opens automatically at `http://localhost:5173`

4. Ollama Setup

```bash
# Pull and run the Llama 3 model
ollama run llama3
```

Keep this running in a separate terminal while using the app.

 API Endpoints

| POST | `/chat` | Send a message to the AI chatbot |
| POST | `/upload-pdf` | Upload a PDF for indexing |
| POST | `/ask-pdf` | Ask a question about the uploaded PDF |
| POST | `/generate-project` | Generate project ideas with arXiv papers |



 Example Prompts

Chatbot
- What is the difference between supervised and unsupervised learning?
- Explain transformer architecture in simple terms
- What are real-world applications of NLP?

PDF Question Answering
- What is the main objective of this paper?
- What methodology or dataset was used?
- Summarize the key findings and conclusions.

Project Generator — try these domains
- NLP
- Computer Vision
- Healthcare AI
- Generative AI
- Autonomous Vehicles



 Roadmap

-  User authentication and profiles
-  Persistent chat history
-  Multiple PDF uploads and switching
-  Streaming AI responses (token by token)
-  Voice assistant integration
-  Cloud deployment (AWS / Railway / Vercel)
-  Dark mode toggle

Author
Sooraj S 
AI/ML Intern at Nest CyberCampus  
📧 soorajs.0805@gmail.com
