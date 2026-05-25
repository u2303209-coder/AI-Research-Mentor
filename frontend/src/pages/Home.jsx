import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";

import PsychologyIcon from "@mui/icons-material/Psychology";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SmartToyIcon from "@mui/icons-material/SmartToy";

import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  // ---------------- SCROLL TO FEATURES ---------------- //

  const scrollToFeatures = () => {

    const section = document.getElementById(
      "features-section"
    );

    section?.scrollIntoView({
      behavior: "smooth",
    });

  };

  return (

    <Container
      maxWidth="xl"
      sx={{
        py: 0,
      }}
    >

      {/* HERO SECTION */}

      <Box
        sx={{
          textAlign: "center",

          minHeight: "100vh",

          display: "flex",
          flexDirection: "column",

          justifyContent: "center",
          alignItems: "center",

          pb: 8,
        }}
      >

        <Typography
          variant="h1"
          sx={{
            fontWeight: 900,
            color: "#0f172a",

            fontSize: {
              xs: "3rem",
              md: "5rem",
            },

            letterSpacing: "-2px",
            lineHeight: 1.05,

            mb: 4,
          }}
        >
          AI-Powered
          <br />
          Research Mentor
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "#475569",

            maxWidth: "900px",

            mx: "auto",

            lineHeight: 1.9,

            fontWeight: 400,

            fontSize: {
              xs: "1rem",
              md: "1.3rem",
            },
          }}
        >
          An AI-driven platform for generating innovative project ideas,
          interacting with intelligent chatbots, and performing PDF
          Question Answering using Retrieval-Augmented Generation.
        </Typography>

        <Button
          variant="contained"
          onClick={scrollToFeatures}
          sx={{
            mt: 6,

            px: 5,
            py: 1.8,

            borderRadius: "18px",

            fontWeight: 700,

            fontSize: "1rem",

            textTransform: "none",

            background: "#2563eb",

            boxShadow:
              "0 6px 18px rgba(37,99,235,0.3)",

            "&:hover": {
              background: "#1d4ed8",
            },
          }}
        >
          Explore Features
        </Button>

      </Box>

      {/* FEATURES SECTION */}

      <Box
        id="features-section"
        sx={{

          pt: 10,

          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr 1fr",
          },

          gap: 4,

          alignItems: "stretch",

          pb: 10,
        }}
      >

        {/* PROJECT GENERATOR */}

        <Paper
          elevation={0}
          onClick={() =>
            navigate("/projects")
          }
          sx={{
            p: 5,

            borderRadius: "28px",

            background: "#ffffff",

            textAlign: "center",

            cursor: "pointer",

            transition: "0.3s",

            boxShadow:
              "0 6px 24px rgba(0,0,0,0.08)",

            "&:hover": {
              transform:
                "translateY(-8px)",
            },
          }}
        >

          <PsychologyIcon
            sx={{
              fontSize: 70,
              color: "#7c3aed",
              mb: 3,
            }}
          />

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,

              color: "#0f172a",

              mb: 2,

              fontSize: "2.3rem",
            }}
          >
            AI Project
            <br />
            Generator
          </Typography>

          <Typography
            sx={{
              color: "#475569",

              lineHeight: 1.9,

              fontSize: "1rem",
            }}
          >
            Generate innovative AI/ML project ideas instantly using
            Large Language Models.
          </Typography>

        </Paper>

        {/* PDF QA */}

        <Paper
          elevation={0}
          onClick={() =>
            navigate("/pdfqa")
          }
          sx={{
            p: 5,

            borderRadius: "28px",

            background: "#ffffff",

            textAlign: "center",

            cursor: "pointer",

            transition: "0.3s",

            boxShadow:
              "0 6px 24px rgba(0,0,0,0.08)",

            "&:hover": {
              transform:
                "translateY(-8px)",
            },
          }}
        >

          <PictureAsPdfIcon
            sx={{
              fontSize: 70,
              color: "#ef4444",
              mb: 3,
            }}
          />

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,

              color: "#0f172a",

              mb: 2,

              fontSize: "2.3rem",
            }}
          >
            PDF Question
            <br />
            Answering
          </Typography>

          <Typography
            sx={{
              color: "#475569",

              lineHeight: 1.9,

              fontSize: "1rem",
            }}
          >
            Upload research papers and ask intelligent context-aware
            questions using RAG architecture.
          </Typography>

        </Paper>

        {/* CHATBOT */}

        <Paper
          elevation={0}
          onClick={() =>
            navigate("/chatbot")
          }
          sx={{
            p: 5,

            borderRadius: "28px",

            background: "#ffffff",

            textAlign: "center",

            cursor: "pointer",

            transition: "0.3s",

            boxShadow:
              "0 6px 24px rgba(0,0,0,0.08)",

            "&:hover": {
              transform:
                "translateY(-8px)",
            },
          }}
        >

          <SmartToyIcon
            sx={{
              fontSize: 70,
              color: "#10b981",
              mb: 3,
            }}
          />

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,

              color: "#0f172a",

              mb: 2,

              fontSize: "2.3rem",
            }}
          >
            AI Chatbot
          </Typography>

          <Typography
            sx={{
              color: "#475569",

              lineHeight: 1.9,

              fontSize: "1rem",
            }}
          >
            Interact with an AI assistant for technical explanations,
            AI concepts, and research guidance.
          </Typography>

        </Paper>

      </Box>

    </Container>

  );

}