import { useState } from "react";
import axios from "axios";

export default function ProjectGenerator() {
  const [domain, setDomain]   = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateProjects = async () => {
    if (!domain.trim()) return;
    try {
      setLoading(true);
      setProjects([]);
      const res = await axios.post("http://127.0.0.1:8000/generate-project", { domain });
      setProjects(res.data.projects);          // now an array of {idea, papers}
    } catch {
      setProjects([{ idea: "Error generating projects.", papers: [] }]);
    } finally {
      setLoading(false);
    }
  };

  const examples = ["NLP", "Computer Vision", "Healthcare AI", "Autonomous Vehicles", "Generative AI"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .pg-page {
          background: #e8e4dc;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          padding-top: 68px;
        }

        .pg-hero {
          max-width: 1080px; margin: 0 auto;
          padding: 72px 60px 56px;
        }

        .pg-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.72rem; letter-spacing: 3px;
          text-transform: uppercase; color: #7c3aed;
          font-weight: 500; margin-bottom: 22px;
        }

        .pg-eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #7c3aed; box-shadow: 0 0 7px rgba(124,58,237,0.5);
        }

        .pg-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.6rem, 5vw, 5rem);
          font-weight: 800; color: #0f0f1a;
          letter-spacing: -2px; line-height: 0.93;
          margin-bottom: 20px;
        }

        .pg-title span {
          color: transparent;
          -webkit-text-stroke: 2px rgba(0,0,0,0.28);
        }

        .pg-sub {
          font-size: 0.97rem; font-weight: 300;
          color: #6b7280; line-height: 1.8;
          max-width: 480px; margin-bottom: 48px;
        }

        /* ── INPUT CARD ── */
        .input-card {
          background: white;
          border: 1px solid #e9ecef;
          border-radius: 24px;
          padding: 36px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.05);
        }

        .input-label {
          font-size: 0.72rem; letter-spacing: 2px;
          text-transform: uppercase; color: #474b51;
          font-weight: 500; margin-bottom: 14px; display: block;
        }

        .domain-input {
          width: 100%; background: #e8e4dc;
          border: 1.5px solid #e5e7eb; border-radius: 14px;
          padding: 17px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.97rem; color: #0f0f1a;
          outline: none; transition: border-color 0.2s ease;
          margin-bottom: 18px;
        }

        .domain-input::placeholder { color: #8a8680; }
        .domain-input:focus { border-color: #a78bfa; background: white; }

        .examples-row {
          display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px;
        }

        .example-pill {
          background: transparent;
          border: 1px solid #e5e7eb; border-radius: 100px;
          padding: 6px 15px; font-size: 0.77rem; color: #6b7280;
          cursor: pointer; transition: all 0.18s ease;
          font-family: 'DM Sans', sans-serif;
        }

        .example-pill:hover {
          border-color: #a78bfa; color: #7c3aed; background: #f5f3ff;
        }

        .generate-btn {
          width: 100%; padding: 17px;
          border-radius: 14px; border: none;
          background: #0f0f1a; color: white;
          font-family: 'Syne', sans-serif;
          font-size: 0.92rem; font-weight: 700;
          cursor: pointer; transition: all 0.22s ease;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }

        .generate-btn:hover:not(:disabled) {
          background: #1a1a2e;
          box-shadow: 0 8px 24px rgba(15,15,26,0.2);
          transform: translateY(-1px);
        }

        .generate-btn:disabled { opacity: 0.45; cursor: not-allowed; }

        .spinner {
          width: 17px; height: 17px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white; border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── RESULTS ── */
        .results-section {
          max-width: 1080px; margin: 0 auto;
          padding: 0 60px 100px;
        }

        .results-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 28px; padding-bottom: 22px;
          border-bottom: 1px solid #d8d4cc;
        }

        .results-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.35rem; font-weight: 800;
          color: #0f0f1a; letter-spacing: -0.3px;
        }

        .results-badge {
          font-size: 0.77rem; color: #6b7280;
          background: white; border: 1px solid #e5e7eb;
          padding: 5px 14px; border-radius: 100px;
        }

        .project-list { display: flex; flex-direction: column; gap: 14px; }

        /* ── PROJECT CARD ── */
        .project-card {
          background: white;
          border: 1px solid #e9ecef;
          border-radius: 18px;
          overflow: hidden;
          transition: all 0.22s ease;
          opacity: 0;
          animation: cardIn 0.38s ease forwards;
        }

        .project-card:hover {
          border-color: #a78bfa;
          box-shadow: 0 8px 24px rgba(124,58,237,0.09);
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .card-main {
          display: flex; gap: 24px; align-items: flex-start;
          padding: 28px 32px;
        }

        .project-index {
          font-family: 'Syne', sans-serif;
          font-size: 0.72rem; font-weight: 700;
          color: #a78bfa; width: 24px; flex-shrink: 0;
          padding-top: 3px; letter-spacing: 1px;
        }

        .project-content {
          color: #374151; font-size: 0.91rem;
          line-height: 1.8; font-weight: 300;
          white-space: pre-line; flex: 1;
        }

        /* ── PAPERS SECTION ── */
        .papers-section {
          border-top: 1px solid #f0ede8;
          padding: 18px 32px 22px 80px;   /* indent to align under text */
          background: #faf9f7;
        }

        .papers-label {
          font-size: 0.68rem; letter-spacing: 2px;
          text-transform: uppercase; font-weight: 600;
          color: #9ca3af; margin-bottom: 12px;
          display: flex; align-items: center; gap: 7px;
        }

        .papers-label::before {
          content: '';
          display: inline-block;
          width: 14px; height: 1px;
          background: #d1d5db;
        }

        .paper-links { display: flex; flex-direction: column; gap: 8px; }

        .paper-link {
          display: flex; flex-direction: column; gap: 3px;
          padding: 11px 16px;
          background: white;
          border: 1px solid #ebe8e2;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.18s ease;
        }

        .paper-link:hover {
          border-color: #a78bfa;
          background: #faf8ff;
          transform: translateX(3px);
        }

        .paper-title {
          font-size: 0.83rem; font-weight: 500;
          color: #1a1814; line-height: 1.4;
        }

        .paper-snippet {
          font-size: 0.76rem; font-weight: 300;
          color: #9ca3af; line-height: 1.5;
        }

        .paper-url {
          font-size: 0.7rem; color: #7c3aed;
          margin-top: 2px; font-weight: 400;
          display: flex; align-items: center; gap: 4px;
        }

        .no-papers {
          font-size: 0.78rem; color: #c5bfb5;
          font-style: italic; padding: 4px 0;
        }

        @media (max-width: 700px) {
          .pg-hero { padding: 56px 24px 36px; }
          .results-section { padding: 0 24px 80px; }
          .input-card { padding: 22px; }
          .card-main { padding: 22px 22px; }
          .papers-section { padding: 16px 22px 20px 22px; }
        }
      `}</style>

      <div className="pg-page">
        {/* ── HERO / INPUT ── */}
        <div className="pg-hero">
          <div className="pg-eyebrow">
            <div className="pg-eyebrow-dot" />
            LLM-Powered Ideation
          </div>
          <h1 className="pg-title">
            AI Project<br /><span>Generator</span>
          </h1>
          <p className="pg-sub">
            Enter a research domain and instantly receive fully-scoped project ideas — each paired with real arXiv research papers to get you started.
          </p>

          <div className="input-card">
            <label className="input-label">Research Domain</label>
            <input
              className="domain-input"
              placeholder="e.g. NLP, Healthcare AI, Computer Vision..."
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generateProjects()}
            />
            <div className="examples-row">
              {examples.map(ex => (
                <button key={ex} className="example-pill" onClick={() => setDomain(ex)}>{ex}</button>
              ))}
            </div>
            <button
              className="generate-btn"
              onClick={generateProjects}
              disabled={loading || !domain.trim()}
            >
              {loading
                ? <><div className="spinner" />Generating & fetching papers...</>
                : <>⬡ Generate Ideas + Research Papers</>}
            </button>
          </div>
        </div>

        {/* ── RESULTS ── */}
        {projects.length > 0 && (
          <div className="results-section">
            <div className="results-header">
              <div className="results-title">Generated Ideas</div>
              <div className="results-badge">{projects.length} ideas · "{domain}"</div>
            </div>

            <div className="project-list">
              {projects.map((project, i) => (
                <div
                  key={i}
                  className="project-card"
                  style={{ animationDelay: `${i * 0.055}s` }}
                >
                  {/* Idea text */}
                  <div className="card-main">
                    <div className="project-index">0{i + 1}</div>
                    <div className="project-content">{project.idea.trim()}</div>
                  </div>

                  {/* arXiv papers */}
                  <div className="papers-section">
                    <div className="papers-label">Related Research Papers</div>
                    {project.papers && project.papers.length > 0 ? (
                      <div className="paper-links">
                        {project.papers.map((paper, j) => (
                          <a
                            key={j}
                            href={paper.url}
                            target="_blank"
                            rel="noreferrer"
                            className="paper-link"
                          >
                            <span className="paper-title">{paper.title}</span>
                            {paper.snippet && (
                              <span className="paper-snippet">{paper.snippet}</span>
                            )}
                            <span className="paper-url">
                              📄 arxiv.org →
                            </span>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="no-papers">No papers found for this idea.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
