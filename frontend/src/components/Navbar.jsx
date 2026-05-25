import { Link, useLocation } from "react-router-dom";

function Navbar() {

  const location = useLocation();

  const isHomePage =
    location.pathname === "/";

  return (

    <nav
      style={{
        background: "#2f63e0",

        padding: "20px 30px",

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        boxShadow:
          "0 2px 10px rgba(0,0,0,0.15)",
      }}
    >

      {/* LOGO */}

      <Link
        to="/"

        style={{
          color: "white",

          textDecoration: "none",

          fontSize: "2rem",

          fontWeight: "700",
        }}
      >
        Research Mentor AI
      </Link>

      {/* SHOW HOME ONLY ON FEATURE PAGES */}

      {!isHomePage && (

        <Link
          to="/"

          style={{
            color: "white",

            textDecoration: "none",

            fontSize: "1.1rem",

            fontWeight: "600",

            padding: "10px 18px",

            borderRadius: "10px",

            transition: "0.3s",
          }}
        >
          Home
        </Link>

      )}

    </nav>

  );

}

export default Navbar;