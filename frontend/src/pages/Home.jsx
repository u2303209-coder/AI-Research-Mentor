import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function Home() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const heroRef = useRef(null);

  const scrollToFeatures = () => {
    document.getElementById("features-section")?.scrollIntoView({ behavior: "smooth" });
  };

  // ── Floating particle canvas ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let W, H;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const NUM = 55;
    const dots = Array.from({ length: NUM }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      // Draw connection lines
      for (let i = 0; i < NUM; i++) {
        for (let j = i + 1; j < NUM; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(100,90,75,${0.12 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      // Draw dots
      dots.forEach((d) => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(90,80,65,${d.alpha})`;
        ctx.fill();
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > W) d.vx *= -1;
        if (d.y < 0 || d.y > H) d.vy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // ── Parallax blobs on mouse move ──
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const move = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 18;
      hero.style.setProperty("--mx", `${x}px`);
      hero.style.setProperty("--my", `${y}px`);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const features = [
    {
      id: "projects", route: "/projects",
      icon: "⬡", label: "01",
      title: "AI Project\nGenerator",
      desc: "Transform any research domain into 10 fully-scoped, publication-ready ideas in seconds.",
      accent: "#6d28d9", bg: "#f5f3ff", border: "#ddd6fe", tag: "LLM-Powered",
    },
    {
      id: "pdfqa", route: "/pdfqa",
      icon: "◈", label: "02",
      title: "PDF Question\nAnswering",
      desc: "Upload any research paper and interrogate it with RAG for precise, context-aware answers.",
      accent: "#c2410c", bg: "#fff7ed", border: "#fed7aa", tag: "RAG Architecture",
    },
    {
      id: "chatbot", route: "/chatbot",
      icon: "◎", label: "03",
      title: "AI Research\nChatbot",
      desc: "An intelligent assistant fluent in AI, ML, and NLP — your 24/7 research companion.",
      accent: "#047857", bg: "#f0fdf4", border: "#a7f3d0", tag: "Conversational AI",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        :root { --bg: #e8e4dc; }
        body { background: var(--bg); color: #1a1814; font-family: 'DM Sans', sans-serif; }

        /* ── HERO ── */
        .hero {
          min-height: 100vh;
          position: relative; overflow: hidden;
          display: flex; flex-direction: column;
          justify-content: center; align-items: flex-start;
          padding: 110px 80px 100px;
          background: var(--bg);
          --mx: 0px; --my: 0px;
        }

        .hero-canvas {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          pointer-events: none;
        }

        /* Soft blobs */
        .blob {
          position: absolute; border-radius: 50%;
          filter: blur(90px); pointer-events: none; z-index: 0;
        }
        .blob1 {
          width: 620px; height: 620px;
          background: radial-gradient(circle, rgba(139,92,246,0.13) 0%, transparent 68%);
          top: -160px; left: -120px;
          transform: translate(var(--mx), var(--my));
          transition: transform 1.2s ease;
        }
        .blob2 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 68%);
          bottom: -60px; right: 60px;
          transform: translate(calc(var(--mx)*-0.5), calc(var(--my)*-0.5));
          transition: transform 1.2s ease;
        }
        .blob3 {
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(251,146,60,0.08) 0%, transparent 68%);
          top: 38%; left: 52%;
        }

        /* Floating rings */
        .ring {
          position: absolute; border-radius: 50%;
          border: 1px solid rgba(0,0,0,0.055);
          pointer-events: none; z-index: 0;
          animation: ringPulse var(--dur) ease-in-out infinite alternate;
        }
        .ring1 { width:480px;height:480px; top:-180px;right:-120px; --dur:6s; }
        .ring2 { width:280px;height:280px; bottom:60px;left:42%; --dur:8s; animation-delay:2s; }
        .ring3 { width:160px;height:160px; top:30%;left:68%; --dur:7s; animation-delay:1s; }

        @keyframes ringPulse {
          from { transform: scale(1); opacity: 0.5; }
          to   { transform: scale(1.06); opacity: 1; }
        }

        /* Marquee strip */
        .marquee-wrap {
          position: absolute; bottom: 52px; left: 0; right: 0;
          overflow: hidden; z-index: 1; pointer-events: none;
        
        }
        .marquee-track {
          display: flex; width: max-content;
          animation: marquee 28s linear infinite;
        }
        .marquee-item {
          font-family: 'Syne', sans-serif;
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 4px; text-transform: uppercase;
          color: rgba(0,0,0,0.38); padding: 0 32px;
          white-space: nowrap;
        }
        .marquee-sep { color: rgba(0,0,0,0.32); }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* Hero content */
        .hero-content { position: relative; z-index: 2; }

        .hero-eyebrow {
          font-size: 0.72rem; font-weight: 500; letter-spacing: 3.5px;
          text-transform: uppercase; color: #047857; margin-bottom: 30px;
          display: flex; align-items: center; gap: 12px;
          opacity: 0; animation: fadeUp 0.6s 0.15s forwards;
        }
        .hero-eyebrow::before {
          content:''; width:28px; height:1.5px; background:#047857; display:block;
        }

        .hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(3.8rem, 7.5vw, 7.5rem);
          font-weight: 800; line-height: 0.93;
          letter-spacing: -3px; color: #1a1814;
          max-width: 820px; margin-bottom: 30px;
          opacity: 0; animation: fadeUp 0.6s 0.28s forwards;
        }
        .outline-word {
          color: transparent;
          -webkit-text-stroke: 2px rgba(26,24,20,0.2);
        }

        .hero-sub {
          font-size: 1.05rem; font-weight: 300; line-height: 1.85;
          color: #5a5448; max-width: 490px; margin-bottom: 44px;
          opacity: 0; animation: fadeUp 0.6s 0.42s forwards;
        }

        .hero-cta-row {
          display: flex; gap: 14px; align-items: center;
          opacity: 0; animation: fadeUp 0.6s 0.55s forwards;
        }

        .btn-primary {
          background: #1a1814; color: #e8e4dc;
          border: none; padding: 15px 34px; border-radius: 100px;
          font-family: 'Syne', sans-serif; font-size: 0.88rem; font-weight: 700;
          cursor: pointer; transition: all 0.22s ease; letter-spacing: 0.2px;
        }
        .btn-primary:hover {
          background: #2d2a25;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(26,24,20,0.2);
        }

        .btn-ghost {
          background: rgba(255,255,255,0.55); color: #4a4740;
          border: 1px solid rgba(0,0,0,0.1);
          padding: 15px 26px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif; font-size: 0.88rem; font-weight: 400;
          cursor: pointer; transition: all 0.22s ease;
          display: flex; align-items: center; gap: 8px;
          backdrop-filter: blur(8px);
        }
        .btn-ghost:hover {
          background: rgba(255,255,255,0.8); color: #1a1814;
          box-shadow: 0 4px 14px rgba(0,0,0,0.08);
        }

        /* Stats */
        .stats-row {
          display: flex; gap: 0; margin-top: 64px;
          border-top: 1px solid rgba(0,0,0,0.1); padding-top: 0;
          opacity: 0; animation: fadeUp 0.6s 0.68s forwards;
        }
        .stat-item {
          padding: 24px 36px 0 0;
          border-right: 1px solid rgba(0,0,0,0.08);
          margin-right: 36px;
        }
        .stat-item:last-child { border-right: none; }
        .stat-num {
          font-family: 'Syne', sans-serif;
          font-size: 1.7rem; font-weight: 800;
          color: #1a1814; letter-spacing: -1px;
        }
        .stat-label {
          font-size: 0.76rem; color: #8a8278;
          font-weight: 400; margin-top: 3px; letter-spacing: 0.2px;
        }

        /* ── FEATURES SECTION ── */
        .features-section {
          padding: 0 80px 120px;
          background: var(--bg);
        }

        .section-top {
          display: flex; justify-content: space-between; align-items: flex-end;
          margin-bottom: 44px; padding: 44px 0 36px;
          border-bottom: 1px solid rgba(0,0,0,0.09);
        }
        .section-label {
          font-size: 0.7rem; letter-spacing: 3px;
          text-transform: uppercase; color: #8a8278; font-weight: 500;
        }
        .section-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.7rem, 2.8vw, 2.6rem); font-weight: 800;
          color: #1a1814; letter-spacing: -1px; line-height: 1.05; text-align: right;
        }

        .feature-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;
        }

        .feature-card {
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 22px; padding: 38px 32px;
          cursor: pointer; position: relative; overflow: hidden;
          transition: all 0.3s ease;
          display: flex; flex-direction: column;
          opacity: 0;
          animation: fadeUp 0.55s ease forwards;
        }
        .feature-card:nth-child(1) { animation-delay: 0.05s; }
        .feature-card:nth-child(2) { animation-delay: 0.15s; }
        .feature-card:nth-child(3) { animation-delay: 0.25s; }

        .feature-card::before {
          content:''; position:absolute; inset:0;
          background: var(--card-bg);
          opacity:0; transition: opacity 0.3s ease; border-radius:22px;
        }
        .feature-card:hover::before { opacity: 1; }
        .feature-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.1);
          border-color: var(--card-border);
        }

        .card-num {
          font-family:'Syne',sans-serif; font-size:0.66rem;
          letter-spacing:3px; color:#c5bfb5; margin-bottom:28px;
          position:relative; z-index:1;
        }
        .card-icon {
          font-size:2rem; margin-bottom:18px; color:var(--card-accent);
          display:block; transition:transform 0.3s ease;
          position:relative; z-index:1;
        }
        .feature-card:hover .card-icon { transform: scale(1.14); }

        .card-tag {
          display:inline-block; font-size:0.65rem; letter-spacing:1.5px;
          text-transform:uppercase; font-weight:600; color:var(--card-accent);
          background:var(--card-bg); border:1px solid var(--card-border);
          padding:4px 11px; border-radius:100px; margin-bottom:14px;
          width:fit-content; position:relative; z-index:1;
        }
        .card-title {
          font-family:'Syne',sans-serif; font-size:1.48rem; font-weight:800;
          color:#1a1814; letter-spacing:-0.4px; line-height:1.15;
          margin-bottom:14px; white-space:pre-line;
          position:relative; z-index:1;
        }
        .card-desc {
          font-size:0.87rem; font-weight:300; line-height:1.75; color:#5a5448;
          flex:1; position:relative; z-index:1;
        }
        .card-cta {
          margin-top:26px; color:var(--card-accent); font-size:0.8rem;
          font-weight:600; display:flex; align-items:center; gap:6px;
          opacity:0; transform:translateX(-6px); transition:all 0.25s ease;
          position:relative; z-index:1;
        }
        .feature-card:hover .card-cta { opacity:1; transform:translateX(0); }

        /* ── FOOTER ── */
        .home-footer {
          padding:32px 80px; border-top:1px solid rgba(142, 137, 137, 0.99);
          display:flex; justify-content:space-between; align-items:center;
          background: var(--bg);
        }
        .footer-brand {
          font-family:'Syne',sans-serif; font-size:0.82rem; font-weight:700; color:#b5af a8;
          color: #272625;
        }
        .footer-stack { font-size:0.74rem; color:#c5bfb5; }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to { opacity:1; transform:translateY(0); }
        }

        @media (max-width:900px) {
          .hero { padding:100px 28px 90px; }
          .features-section { padding:0 24px 100px; }
          .feature-grid { grid-template-columns:1fr; }
          .section-top { flex-direction:column; align-items:flex-start; gap:12px; }
          .section-heading { text-align:left; }
          .process-strip { margin:0 24px 60px; grid-template-columns:1fr; gap:32px; padding:36px 28px; }
          .process-step { border-right:none; border-bottom:1px solid rgba(255,255,255,0.08); padding:0 0 28px; margin:0; }
          .process-step:last-child { border-bottom:none; padding-bottom:0; }
          .home-footer { flex-direction:column; gap:10px; text-align:center; padding:26px; }
          .stats-row { flex-wrap:wrap; }
          .stat-item { padding:18px 24px 0 0; margin-right:0; }
        }
      `}</style>

      <div style={{ background: "#d8d8ca" }}>
        {/* ── HERO ── */}
        <section className="hero" ref={heroRef}>
          <canvas className="hero-canvas" ref={canvasRef} />
          <div className="blob blob1" />
          <div className="blob blob2" />
          <div className="blob blob3" />
          <div className="ring ring1" />
          <div className="ring ring2" />
          <div className="ring ring3" />

          <div className="hero-content">
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
              <button className="btn-ghost" onClick={() => navigate("/chatbot")}>Chat with AI <span>→</span></button>
            </div>
            <div className="stats-row">
              {[["3","Core AI Tools"],["RAG","PDF Retrieval"],["LLM","Idea Engine"]].map(([n,l]) => (
                <div key={l} className="stat-item">
                  <div className="stat-num">{n}</div>
                  <div className="stat-label">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Marquee */}
          <div className="marquee-wrap">
            <div className="marquee-track">
              {[...Array(2)].map((_, di) => (
                ["AI Project Generator","◆","PDF Question Answering","◆","RAG Architecture","◆","Conversational AI","◆","Large Language Models","◆"].map((w, i) => (
                  <span key={`${di}-${i}`} className={`marquee-item ${w==="◆"?"marquee-sep":""}`}>{w}</span>
                ))
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="features-section" id="features-section">
          <div className="section-top">
            <span className="section-label">Core Capabilities</span>
            <h2 className="section-heading">Three tools.<br />Infinite potential.</h2>
          </div>
          <div className="feature-grid">
            {features.map(f => (
              <div
                key={f.id}
                className="feature-card"
                style={{ "--card-accent":f.accent, "--card-bg":f.bg, "--card-border":f.border }}
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
        </footer>
      </div>
    </>
  );
}
