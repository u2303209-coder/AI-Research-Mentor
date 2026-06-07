import { useState, useEffect } from "react";
import axios from "axios";

export default function PdfQA() {
  const [file, setFile] = useState(null);

  // Force scroll to top on mount — fixes mid-page entry
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [pdfViewerUrl, setPdfViewerUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setPdfViewerUrl(`http://127.0.0.1:8000/uploads/${selectedFile.name}`);
    setUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    try { await axios.post("http://127.0.0.1:8000/upload-pdf", formData); }
    catch (e) { console.log(e); }
    setUploading(false);
  };

  const askQuestion = async () => {
    if (!question.trim()) return;
    setLoading(true); setAnswer("");
    try {
      const res = await axios.post("http://127.0.0.1:8000/ask-pdf", { question });
      setAnswer(res.data.response);
    } catch { setAnswer("Error generating response."); }
    setLoading(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .pdf-page {
          background: #e8e4dc;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          padding-top: 68px;
        }

        .pdf-header {
          background: white;
          border-bottom: 1px solid #e9ecef;
          padding: 40px 60px 36px;
        }

        .pdf-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.72rem; letter-spacing: 3px;
          text-transform: uppercase; color: #dc2626;
          font-weight: 500; margin-bottom: 14px;
        }

        .pdf-eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #dc2626; box-shadow: 0 0 7px rgba(220,38,38,0.45);
        }

        .pdf-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 3.5vw, 3.2rem);
          font-weight: 800; color: #0f0f1a;
          letter-spacing: -1.5px; line-height: 0.95;
          margin-bottom: 12px;
        }

        .pdf-sub {
          font-size: 0.88rem; color: #9ca3af;
          font-weight: 300; max-width: 480px; line-height: 1.7;
        }

        .pdf-main {
          display: grid;
          grid-template-columns: 1fr 360px;
          min-height: calc(100vh - 68px - 148px);
        }

        /* LEFT */
        .pdf-left {
          border-right: 1px solid #e9ecef;
          display: flex; flex-direction: column;
          padding: 32px 36px 36px;
          gap: 16px;
        }

        .upload-zone {
          border: 1.5px dashed #d1d5db;
          border-radius: 18px; padding: 36px;
          text-align: center; cursor: pointer;
          transition: all 0.22s ease;
          background: white;
        }

        .upload-zone:hover {
          border-color: #f87171;
          background: #fff5f5;
        }

        .upload-icon {
          font-size: 2.2rem; margin-bottom: 14px;
          display: block; color: #ef4444;
        }

        .upload-title {
          font-family: 'Syne', sans-serif;
          font-size: 0.97rem; font-weight: 700;
          color: #0f0f1a; margin-bottom: 6px;
        }

        .upload-hint { font-size: 0.8rem; color: #9ca3af; font-weight: 300; }

        .file-badge {
          background: #fff5f5;
          border: 1px solid #fecaca;
          border-radius: 12px; padding: 14px 18px;
          display: flex; align-items: center; gap: 12px;
        }

        .file-badge-icon { font-size: 1.1rem; color: #ef4444; }

        .file-badge-text { flex: 1; }

        .file-badge-name {
          font-size: 0.85rem; font-weight: 500; color: #1a1a2e;
        }

        .file-badge-status { font-size: 0.73rem; color: #ef4444; margin-top: 2px; }

        .file-badge-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 6px rgba(16,185,129,0.5);
          flex-shrink: 0;
        }

        .pdf-frame {
          flex: 1; min-height: 560px;
          background: white; border: 1px solid #e9ecef;
          border-radius: 16px; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }

        .pdf-placeholder { text-align: center; }
        .pdf-placeholder-icon { font-size: 2.5rem; color: #e5e7eb; margin-bottom: 14px; }
        .pdf-placeholder-text { font-size: 0.84rem; color: #c9cdd4; font-weight: 300; }

        /* RIGHT */
        .qa-panel {
          display: flex; flex-direction: column;
          padding: 28px 24px; gap: 16px;
          overflow-y: auto;
          background: #e8e4dc;
        }

        .qa-section-label {
          font-size: 0.7rem; letter-spacing: 2px;
          text-transform: uppercase; color: #9ca3af; font-weight: 500;
        }

        .qa-textarea {
          width: 100%; background: white;
          border: 1.5px solid #e5e7eb; border-radius: 14px;
          padding: 16px 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem; font-weight: 300; color: #0f0f1a;
          resize: none; min-height: 130px;
          outline: none; transition: border-color 0.2s ease;
          line-height: 1.7;
        }

        .qa-textarea::placeholder { color: #c9cdd4; }
        .qa-textarea:focus { border-color: #fca5a5; }

        .ask-btn {
          width: 100%; padding: 15px; border-radius: 13px;
          border: none; background: #dc2626; color: white;
          font-family: 'Syne', sans-serif; font-size: 0.88rem;
          font-weight: 700; cursor: pointer;
          transition: all 0.22s ease;
          display: flex; align-items: center;
          justify-content: center; gap: 8px;
        }

        .ask-btn:hover:not(:disabled) {
          background: #b91c1c;
          box-shadow: 0 8px 20px rgba(220,38,38,0.25);
          transform: translateY(-1px);
        }

        .ask-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .spinner {
          width: 15px; height: 15px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white; border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .answer-box {
          background: white; border: 1px solid #e9ecef;
          border-radius: 16px; padding: 22px;
          animation: fadeIn 0.35s ease; flex: 1;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

        .answer-tag {
          display: inline-block;
          background: #fff5f5; border: 1px solid #fecaca;
          border-radius: 8px; padding: 4px 10px;
          font-size: 0.67rem; letter-spacing: 1.5px;
          text-transform: uppercase; color: #ef4444;
          font-weight: 600; margin-bottom: 16px;
        }

        .answer-divider {
          height: 1px; background: #f3f4f6;
          margin-bottom: 16px;
        }

        .answer-text {
          font-size: 0.88rem; line-height: 1.85;
          color: #374151; font-weight: 300; white-space: pre-wrap;
        }

        @media (max-width: 900px) {
          .pdf-main { grid-template-columns: 1fr; }
          .pdf-left { border-right: none; border-bottom: 1px solid #e9ecef; }
          .pdf-header { padding: 36px 24px 28px; }
          .qa-panel { padding: 22px; }
        }
      `}</style>

      <div className="pdf-page">
        <div className="pdf-header">
          <div className="pdf-eyebrow"><div className="pdf-eyebrow-dot" />RAG Architecture</div>
          <h1 className="pdf-title">PDF Question<br />Answering</h1>
          <p className="pdf-sub">Upload a research paper and interrogate it with context-aware AI powered by retrieval-augmented generation.</p>
        </div>

        <div className="pdf-main">
          {/* LEFT — VIEWER */}
          <div className="pdf-left">
            <input type="file" hidden id="pdf-upload" accept=".pdf" onChange={handleFileChange} />
            <label htmlFor="pdf-upload">
              <div className="upload-zone">
                <span className="upload-icon">◈</span>
                <div className="upload-title">{uploading ? "Processing PDF..." : "Click to upload a PDF"}</div>
                <p className="upload-hint">Supports any PDF document</p>
              </div>
            </label>

            {file && (
              <div className="file-badge">
                <span className="file-badge-icon">◈</span>
                <div className="file-badge-text">
                  <div className="file-badge-name">{file.name}</div>
                  <div className="file-badge-status">{uploading ? "Indexing..." : "Ready for Q&A"}</div>
                </div>
                <div className="file-badge-dot" />
              </div>
            )}

            <div className="pdf-frame">
              {pdfViewerUrl ? (
                <iframe src={pdfViewerUrl} width="100%" height="100%" title="PDF Viewer" style={{ border: "none", minHeight: "560px" }} />
              ) : (
                <div className="pdf-placeholder">
                  <div className="pdf-placeholder-icon">◈</div>
                  <p className="pdf-placeholder-text">Upload a PDF to preview it here</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Q&A */}
          <div className="qa-panel">
            <div className="qa-section-label">Your Question</div>
            <textarea
              className="qa-textarea"
              placeholder="What are the key findings? What methodology was used? Summarize the conclusion..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button className="ask-btn" onClick={askQuestion} disabled={loading || !question.trim() || !file}>
              {loading ? <><div className="spinner" />Analyzing...</> : <>◈ Ask Question</>}
            </button>

            {answer && (
              <div className="answer-box">
                <div className="answer-tag">AI Response</div>
                <div className="answer-divider" />
                <div className="answer-text">{answer}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
