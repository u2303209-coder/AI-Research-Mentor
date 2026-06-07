import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 0 48px;
          background: transparent;
          pointer-events: none;
        }

        .home-btn {
          pointer-events: all;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #3d3a34;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.5px;
          background: rgba(235,232,225,0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0,0,0,0.08);
          padding: 8px 18px 8px 14px;
          border-radius: 100px;
          transition: all 0.22s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        .home-btn:hover {
          background: rgba(220,217,210,0.9);
          color: #1a1814;
          border-color: rgba(0,0,0,0.13);
        }

        .home-btn svg {
          width: 14px; height: 14px;
          opacity: 0.65;
        }

        @media (max-width: 700px) {
          .navbar { padding: 0 20px; }
        }
      `}</style>

      <nav className="navbar">
        {!isHomePage && (
          <Link to="/" className="home-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Home
          </Link>
        )}
      </nav>
    </>
  );
}

export default Navbar;
