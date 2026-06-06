import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 0 40px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.4s ease;
          background: ${scrolled ? "rgba(6,8,15,0.92)" : "transparent"};
          backdrop-filter: ${scrolled ? "blur(20px)" : "none"};
          border-bottom: ${scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent"};
        }

        .navbar-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.15rem;
          letter-spacing: -0.3px;
          color: white;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .navbar-logo .logo-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #6ee7b7;
          box-shadow: 0 0 10px #6ee7b7;
          animation: pulse-dot 2s infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }

        .navbar-home-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          padding: 8px 20px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 100px;
          transition: all 0.25s ease;
        }

        .navbar-home-link:hover {
          color: white;
          border-color: rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.06);
        }
      `}</style>

      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <span className="logo-dot" />
          Research Mentor AI
        </Link>
        {!isHomePage && (
          <Link to="/" className="navbar-home-link">
            ← Home
          </Link>
        )}
      </nav>
    </>
  );
}

export default Navbar;
