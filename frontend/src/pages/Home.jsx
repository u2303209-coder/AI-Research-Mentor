import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  const scrollToFeatures = () => {
    document.getElementById("features-section")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      heroRef.current.style.setProperty("--mx", `${x}px`);
      heroRef.current.style.setProperty("--my", `${y}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const features = [
    {
      id: "projects", route: "/projects",
      icon: "⬡", label: "01", title: "AI Project\nGenerator",
      desc: "Transform a domain into 10 fully-scoped, publication-ready research ideas in seconds.",
      accent: "#7c3aed", bg: "#f5f3ff", border: "#e9d5ff", tag: "LLM-Powered",
    },
    {
      id: "pdfqa", route: "/pdfqa",
      icon: "◈", label: "02", title: "PDF Question\nAnswering",
      desc: "Upload any research paper and interrogate it with RAG for context-aware answers.",
      accent: "#dc2626", bg: "#fff5f5", border: "#fecaca", tag: "RAG Architecture",
    },
    {
      id: "chatbot", route: "/chatbot",
      icon: "◎", label: "03", title: "AI Research\nChatbot",
      desc: "An intelligent assistant fluent in AI, ML, and NLP — your 24/7 research companion.",
      accent: "#059669", bg: "#f0fdf4", border: "#bbf7d0", tag: "Conversational AI",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: #f8f7f4; color: #1a1a2e; font-family: 'DM Sans', sans-serif; }

        .home-wrap { min-height: 100vh; background: #f8f7f4; }

        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex; flex-direction: column;
          justify-content: center; align-items: flex-start;
          padding: 130px 80px 80px;
          position: relative; overflow: hidden;
          --mx: 0px; --my: 0px;
        }

        .hero-noise {
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        .hero-blob {
          position: absolute; border-radius: 50%;
          filter: blur(100px); pointer-events: none;
        }

        .blob1 {
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 65%);
          top: -200px; left: -150px;
          transform: translate(var(--mx), var(--my));
          transition: transform 1s ease;
        }

        .blob2 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 65%);
          bottom: 0; right: 80px;
          transform: translate(calc(var(--mx)*-0.4), calc(var(--my)*-0.4));
          transition: transform 1s ease;
        }

        .blob3 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(251,146,60,0.08) 0%, transparent 65%);
          top: 40%; left: 50%;
        }

        .hero-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem; font-weight: 500;
          letter-spacing: 3px; text-transform: uppercase;
          color: #059669; margin-bottom: 28px;
          display: flex; align-items: center; gap: 12px;
          opacity: 0; animation: fadeUp 0.6s 0.15s forwards;
        }

        .hero-eyebrow::before {
          content: ''; width: 28px; height: 1.5px;
          background: #059669; display: block;
        }

        .hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(3.8rem, 7.5vw, 7.5rem);
          font-weight: 800; line-height: 0.92;
          letter-spacing: -3px; color: #0f0f1a;
          max-width: 850px; margin-bottom: 32px;
          opacity: 0; animation: fadeUp 0.6s 0.28s forwards;
        }

        .hero-title .outline-word {
          color: transparent;
          -webkit-text-stroke: 2px rgba(15,15,26,0.18);
        }

        .hero-sub {
          font-size: 1.05rem; font-weight: 300;
          line-height: 1.85; color: #6b7280;
          max-width: 500px; margin-bottom: 48px;
          opacity: 0; animation: fadeUp 0.6s 0.42s forwards;
        }

        .hero-cta-row {
          display: flex; gap: 14px; align-items: center;
          opacity: 0; animation: fadeUp 0.6s 0.55s forwards;
        }

        .btn-primary {
          background: #0f0f1a; color: white;
          border: none; padding: 15px 34px;
          border-radius: 100px;
          font-family: 'Syne', sans-serif;
          font-size: 0.88rem; font-weight: 700;
          cursor: pointer; transition: all 0.22s ease;
          letter-spacing: 0.2px;
        }

        .btn-primary:hover {
          background: #1a1a2e;
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(15,15,26,0.2);
        }

        .btn-ghost {
          background: white; color: #4b5563;
          border: 1px solid #e5e7eb;
          padding: 15px 26px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; font-weight: 400;
          cursor: pointer; transition: all 0.22s ease;
          display: flex; align-items: center; gap: 8px;
        }

        .btn-ghost:hover {
          border-color: #d1d5db; color: #1a1a2e;
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
        }

        .hero-scroll {
          position: absolute; bottom: 44px; left: 80px;
          display: flex; align-items: center; gap: 12px;
          color: #9ca3af; font-size: 0.72rem;
          letter-spacing: 2px; text-transform: uppercase;
          opacity: 0; animation: fadeUp 0.6s 0.8s forwards;
        }

        .scroll-bar {
          width: 36px; height: 1.5px;
          background: #e5e7eb; overflow: hidden; position: relative;
        }

        .scroll-bar::after {
          content: ''; position: absolute; inset: 0;
          background: #9ca3af;
          transform: translateX(-100%);
          animation: barSlide 2s 1.5s infinite;
        }

        @keyframes barSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        /* STATS ROW */
        .stats-row {
          display: flex; gap: 0;
          margin-top: 72px;
          border-top: 1px solid rgba(0,0,0,0.06);
          opacity: 0; animation: fadeUp 0.6s 0.68s forwards;
        }

        .stat-item {
          padding: 28px 40px 0 0;
          border-right: 1px solid rgba(0,0,0,0.06);
          margin-right: 40px;
        }

        .stat-item:last-child { border-right: none; }

        .stat-num {
          font-family: 'Syne', sans-serif;
          font-size: 1.8rem; font-weight: 800;
          color: #0f0f1a; letter-spacing: -1px;
        }

        .stat-label {
          font-size: 0.78rem; color: #9ca3af;
          font-weight: 400; margin-top: 4px;
          letter-spacing: 0.3px;
        }

        /* FEATURES */
        .features-section { padding: 80px 80px 120px; }

        .section-top {
          display: flex; justify-content: space-between;
          align-items: flex-end; margin-bottom: 48px;
          padding-bottom: 32px;
          border-bottom: 1px solid rgba(0,0,0,0.07);
        }

        .section-label {
          font-size: 0.72rem; letter-spacing: 3px;
          text-transform: uppercase; color: #9ca3af; font-weight: 500;
        }

        .section-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.8rem, 3vw, 2.8rem);
          font-weight: 800; color: #0f0f1a;
          letter-spacing: -1px; line-height: 1.05;
          text-align: right;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .feature-card {
          background: white;
          border: 1px solid #e9ecef;
          border-radius: 24px;
          padding: 40px 36px;
          cursor: pointer;
          position: relative; overflow: hidden;
          transition: all 0.3s ease;
          display: flex; flex-direction: column;
        }

        .feature-card::after {
          content: '';
          position: absolute; inset: 0;
          background: var(--card-bg);
          opacity: 0; transition: opacity 0.3s ease;
          border-radius: 24px;
        }

        .feature-card:hover::after { opacity: 1; }

        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.08);
          border-color: var(--card-border);
        }

        .card-num {
          font-family: 'Syne', sans-serif;
          font-size: 0.68rem; letter-spacing: 3px;
          color: #d1d5db; margin-bottom: 32px;
          position: relative; z-index: 1;
        }

        .card-icon {
          font-size: 2rem; margin-bottom: 20px;
          color: var(--card-accent);
          display: block; position: relative; z-index: 1;
          transition: transform 0.3s ease;
        }

        .feature-card:hover .card-icon { transform: scale(1.12); }

        .card-tag {
          display: inline-block;
          font-size: 0.67rem; letter-spacing: 1.5px;
          text-transform: uppercase; font-weight: 600;
          color: var(--card-accent);
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          padding: 4px 11px; border-radius: 100px;
          margin-bottom: 16px; width: fit-content;
          position: relative; z-index: 1;
        }

        .card-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.55rem; font-weight: 800;
          color: #0f0f1a; letter-spacing: -0.5px;
          line-height: 1.15; margin-bottom: 16px;
          white-space: pre-line;
          position: relative; z-index: 1;
        }

        .card-desc {
          font-size: 0.88rem; font-weight: 300;
          line-height: 1.75; color: #6b7280;
          flex: 1; position: relative; z-index: 1;
        }

        .card-cta {
          margin-top: 28px;
          color: var(--card-accent);
          font-size: 0.82rem; font-weight: 600;
          display: flex; align-items: center; gap: 6px;
          opacity: 0; transform: translateX(-6px);
          transition: all 0.25s ease;
          position: relative; z-index: 1;
        }

        .feature-card:hover .card-cta { opacity: 1; transform: translateX(0); }

        /* FOOTER */
        .home-footer {
          padding: 36px 80px;
          border-top: 1px solid rgba(0,0,0,0.07);
          display: flex; justify-content: space-between; align-items: center;
          background: #f8f7f4;
        }

        .footer-brand {
          font-family: 'Syne', sans-serif;
          font-size: 0.82rem; font-weight: 700;
          color: #c9cdd4;
        }

        .footer-stack {
          font-size: 0.75rem; color: #d1d5db;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .hero { padding: 120px 28px 80px; }
          .hero-scroll { left: 28px; }
          .stats-row { flex-wrap: wrap; gap: 8px; }
          .stat-item { padding: 20px 24px 0 0; margin-right: 0; }
          .features-section { padding: 60px 28px 100px; }
          .feature-grid { grid-template-columns: 1fr; }
          .section-top { flex-direction: column; align-items: flex-start; gap: 12px; }
          .section-heading { text-align: left; }
          .home-footer { flex-direction: column; gap: 10px; text-align: center; padding: 28px; }
        }
      `}</style>

      <div className="home-wrap">
        <section className="hero" ref={heroRef}>
          <div className="hero-noise" />
          <div className="hero-blob blob1" />
          <div className="hero-blob blob2" />
          <div className="hero-blob blob3" />

          <div className="hero-eyebrow">AI-Powered Research Platform</div>

          <h1 className="hero-title">
            Research<br />
            <span className="outline-word">Smarter.</span><br />
            Not Harder.
          </h1>

          <p className="hero-sub">
            Generate breakthrough project ideas, interrogate research papers, and get expert AI guidance — all in one unified workspace.
          </p>

          <div className="hero-cta-row">
            <button className="btn-primary" onClick={scrollToFeatures}>Explore the Platform</button>
            <button className="btn-ghost" onClick={() => navigate("/chatbot")}>
              Chat with AI <span>→</span>
            </button>
          </div>

          <div className="stats-row">
            {[["3", "Core AI Tools"],["RAG", "PDF Retrieval"],["LLM", "Idea Engine"]].map(([n, l]) => (
              <div key={l} className="stat-item">
                <div className="stat-num">{n}</div>
                <div className="stat-label">{l}</div>
              </div>
            ))}
          </div>

          <div className="hero-scroll">
            <span className="scroll-bar" />
            Scroll to explore
          </div>
        </section>

        <section className="features-section" id="features-section">
          <div className="section-top">
            <span className="section-label">Core Capabilities</span>
            <h2 className="section-heading">Three tools.<br />Infinite potential.</h2>
          </div>

          <div className="feature-grid">
            {features.map((f) => (
              <div
                key={f.id}
                className="feature-card"
                style={{ "--card-accent": f.accent, "--card-bg": f.bg, "--card-border": f.border }}
                onClick={() => navigate(f.route)}
              >
                <div className="card-num">{f.label}</div>
                <span className="card-icon">{f.icon}</span>
                <div className="card-tag">{f.tag}</div>
                <div className="card-title">{f.title}</div>
                <p className="card-desc">{f.desc}</p>
                <div className="card-cta">Open tool →</div>
              </div>
            ))}
          </div>
        </section>

        <footer className="home-footer">
          <div className="footer-brand">Research Mentor AI</div>
          <div className="footer-stack">Built with React · FastAPI · Claude · RAG</div>
        </footer>
      </div>
    </>
  );
}
