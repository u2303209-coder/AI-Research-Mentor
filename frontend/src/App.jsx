import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Chatbot from "./pages/Chatbot";
import PdfQA from "./pages/PdfQA";
import ProjectGenerator from "./pages/ProjectGenerator";

function App() {

  return (

    <BrowserRouter>

      {/* ---------------- NAVBAR ---------------- */}

      <div
        style={{
          background: "#2563eb",

          color: "white",

          padding: "20px 40px",

          display: "flex",

          justifyContent: "space-between",

          alignItems: "center",

          boxShadow:
            "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >

        {/* LEFT SIDE */}

        <h1
          style={{
            fontSize: "22px",

            fontWeight: "700",

            margin: 0,
          }}
        >
          Research Mentor AI
        </h1>

        {/* RIGHT SIDE */}

        <Link
          to="/"

          style={{
            color: "white",

            textDecoration: "none",

            display: "flex",

            alignItems: "center",

            gap: "8px",

            fontWeight: "600",

            fontSize: "18px",
          }}
        >

          {/* HOME ICON */}

          <svg
            xmlns="http://www.w3.org/2000/svg"

            width="22"

            height="22"

            fill="none"

            viewBox="0 0 24 24"

            stroke="currentColor"

            strokeWidth="2"
          >

            <path
              strokeLinecap="round"

              strokeLinejoin="round"

              d="M3 10.5L12 3l9 7.5"
            />

            <path
              strokeLinecap="round"

              strokeLinejoin="round"

              d="M5 9.5V21h14V9.5"
            />

          </svg>

          Home

        </Link>

      </div>

      {/* ---------------- ROUTES ---------------- */}

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/chatbot"
          element={<Chatbot />}
        />

        <Route
          path="/pdfqa"
          element={<PdfQA />}
        />

        <Route
          path="/projects"
          element={<ProjectGenerator />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;