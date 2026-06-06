import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const updated = [...messages, { role: "user", content: input }];
    setMessages(updated);
    setInput("");
    setLoading(true);
    if (textareaRef.current) textareaRef.current.style.height = "56px";
    try {
      const res = await axios.post("http://127.0.0.1:8000/chat", { messages: updated });
      setMessages([...updated, { role: "assistant", content: res.data.response }]);
    } catch {
      setMessages([...updated, { role: "assistant", content: "Failed to generate response." }]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const handleInput = (e) => {
    setInput(e.target.value);
    const ta = textareaRef.current;
    if (ta) { ta.style.height = "56px"; ta.style.height = Math.min(ta.scrollHeight, 160) + "px"; }
  };

  const suggestions = [
    "Explain transformer architecture",
    "What is RAG in NLP?",
    "Difference between CNN and RNN",
    "How does BERT work?",
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .chat-page {
          background: #f8f7f4;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          padding-top: 68px;
          display: flex; flex-direction: column;
        }

        .chat-header {
          background: white;
          border-bottom: 1px solid #e9ecef;
          padding: 28px 60px;
        }

        .chat-header-inner {
          max-width: 860px; margin: 0 auto;
          display: flex; align-items: center; gap: 18px;
        }

        .chat-icon-wrap {
          width: 48px; height: 48px;
          border-radius: 14px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.3rem; color: #059669; flex-shrink: 0;
        }

        .chat-header-text h1 {
          font-family: 'Syne', sans-serif;
          font-size: 1.4rem; font-weight: 800;
          color: #0f0f1a; letter-spacing: -0.3px;
        }

        .chat-header-text p {
          font-size: 0.83rem; color: #9ca3af;
          margin-top: 3px; font-weight: 300;
        }

        .chat-status {
          margin-left: auto;
          display: flex; align-items: center; gap: 7px;
          font-size: 0.75rem; color: #059669; font-weight: 500;
        }

        .status-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 6px rgba(16,185,129,0.5);
          animation: blink 2s infinite;
        }

        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0.35;} }

        .chat-body {
          flex: 1;
          max-width: 860px; width: 100%;
          margin: 0 auto;
          padding: 36px 60px;
          display: flex; flex-direction: column;
        }

        .empty-state {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          flex: 1; padding: 80px 0; gap: 40px;
        }

        .empty-heading {
          font-family: 'Syne', sans-serif;
          font-size: 1.7rem; font-weight: 800;
          color: #9ca3af; text-align: center;
          letter-spacing: -0.5px;
        }

        .suggestions-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 10px; width: 100%; max-width: 540px;
        }

        .suggestion-chip {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 14px 18px;
          color: #6b7280; font-size: 0.84rem;
          font-weight: 400; line-height: 1.5;
          cursor: pointer; text-align: left;
          transition: all 0.2s ease;
          font-family: 'DM Sans', sans-serif;
        }

        .suggestion-chip:hover {
          border-color: #10b981;
          color: #059669;
          background: #f0fdf4;
        }

        .message-row {
          display: flex; gap: 14px; margin-bottom: 24px;
          animation: msgIn 0.28s ease forwards;
        }

        .message-row.user { flex-direction: row-reverse; }

        @keyframes msgIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .msg-avatar {
          width: 34px; height: 34px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; font-weight: 700;
          flex-shrink: 0; margin-top: 2px;
        }

        .msg-avatar.ai {
          background: #f0fdf4; border: 1px solid #bbf7d0;
          color: #059669;
        }

        .msg-avatar.user-av {
          background: #f3f4f6; border: 1px solid #e5e7eb;
          color: #6b7280;
        }

        .msg-bubble {
          max-width: 78%; padding: 15px 20px;
          border-radius: 18px; font-size: 0.93rem;
          line-height: 1.75; white-space: pre-wrap;
        }

        .msg-bubble.ai-bubble {
          background: white;
          border: 1px solid #e9ecef;
          color: #374151;
          border-radius: 4px 18px 18px 18px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }

        .msg-bubble.user-bubble {
          background: #0f0f1a;
          color: white;
          border-radius: 18px 4px 18px 18px;
        }

        .typing-indicator {
          display: flex; align-items: center; gap: 5px;
          padding: 16px 20px;
          background: white; border: 1px solid #e9ecef;
          border-radius: 4px 18px 18px 18px;
          width: fit-content;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }

        .typing-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #10b981;
          animation: bounce 1.2s infinite;
        }

        .typing-dot:nth-child(2) { animation-delay: 0.18s; }
        .typing-dot:nth-child(3) { animation-delay: 0.36s; }

        @keyframes bounce {
          0%,80%,100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }

        .chat-input-area {
          position: sticky; bottom: 0;
          background: linear-gradient(to top, #f8f7f4 75%, transparent);
          padding: 16px 60px 32px;
          max-width: 860px; width: 100%;
          margin: 0 auto;
        }

        .input-wrapper {
          display: flex; align-items: flex-end; gap: 10px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 20px;
          padding: 10px 10px 10px 20px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          transition: border-color 0.2s ease;
        }

        .input-wrapper:focus-within { border-color: #10b981; }

        .chat-textarea {
          flex: 1; background: transparent; border: none;
          outline: none; font-family: 'DM Sans', sans-serif;
          font-size: 0.93rem; font-weight: 300; color: #1a1a2e;
          resize: none; height: 56px; max-height: 160px;
          line-height: 1.6; padding: 8px 0;
        }

        .chat-textarea::placeholder { color: #c9cdd4; }

        .send-btn {
          width: 42px; height: 42px; border-radius: 12px;
          background: #0f0f1a; border: none;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; flex-shrink: 0;
          transition: all 0.2s ease; color: white;
        }

        .send-btn:hover:not(:disabled) { background: #1a1a2e; transform: scale(1.05); }
        .send-btn:disabled { opacity: 0.3; cursor: not-allowed; }

        .input-hint {
          text-align: center; font-size: 0.7rem;
          color: #d1d5db; margin-top: 10px; letter-spacing: 0.3px;
        }

        @media (max-width: 700px) {
          .chat-header { padding: 24px; }
          .chat-status { display: none; }
          .chat-body { padding: 24px; }
          .chat-input-area { padding: 12px 24px 24px; }
          .suggestions-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="chat-page">
        <div className="chat-header">
          <div className="chat-header-inner">
            <div className="chat-icon-wrap">◎</div>
            <div className="chat-header-text">
              <h1>AI Research Chatbot</h1>
              <p>Ask anything about AI, ML, NLP, and research methods</p>
            </div>
            <div className="chat-status">
              <div className="status-dot" />
              Online
            </div>
          </div>
        </div>

        <div className="chat-body">
          {messages.length === 0 ? (
            <div className="empty-state">
              <p className="empty-heading">What would you like<br />to explore today?</p>
              <div className="suggestions-grid">
                {suggestions.map((s, i) => (
                  <button key={i} className="suggestion-chip" onClick={() => setInput(s)}>{s}</button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={`message-row ${msg.role === "user" ? "user" : ""}`}>
                <div className={`msg-avatar ${msg.role === "user" ? "user-av" : "ai"}`}>
                  {msg.role === "user" ? "U" : "AI"}
                </div>
                <div className={`msg-bubble ${msg.role === "user" ? "user-bubble" : "ai-bubble"}`}>
                  {msg.content}
                </div>
              </div>
            ))
          )}

          {loading && (
            <div className="message-row">
              <div className="msg-avatar ai">AI</div>
              <div className="typing-indicator">
                <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="chat-input-area">
          <div className="input-wrapper">
            <textarea
              ref={textareaRef}
              className="chat-textarea"
              placeholder="Ask anything about AI, ML, NLP..."
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
            />
            <button className="send-btn" onClick={sendMessage} disabled={loading || !input.trim()}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
          <p className="input-hint">Enter to send · Shift+Enter for new line</p>
        </div>
      </div>
    </>
  );
}
