import { useState } from "react";

import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

import PsychologyIcon from "@mui/icons-material/Psychology";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import axios from "axios";

export default function ProjectGenerator() {

  const [domain, setDomain] = useState("");

  const [projects, setProjects] = useState("");

  const [loading, setLoading] = useState(false);

  // ---------------- GENERATE PROJECTS ---------------- //

  const generateProjects = async () => {

    if (!domain.trim()) return;

    try {

      setLoading(true);

      setProjects("");

      const res = await axios.post(

        "http://127.0.0.1:8000/generate-project",

        {
          domain,
        }

      );

      setProjects(
        res.data.response
      );

    }

    catch (error) {

      console.log(error);

      setProjects(
        "Error generating projects."
      );

    }

    finally {

      setLoading(false);

    }

  };

  // ---------------- FORMAT PROJECTS ---------------- //

  const formattedProjects = projects
    .split(/\n(?=\d+\.)/)
    .filter(
      (project) =>
        project.trim() !== ""
    );

  return (

    <Container
      maxWidth="xl"
      sx={{
        py: 6,
      }}
    >

      {/* MAIN CONTAINER */}

      <Paper
        elevation={0}
        sx={{
          p: {
            xs: 4,
            md: 6,
          },

          borderRadius: "30px",

          background: "#ffffff",

          boxShadow:
            "0 8px 30px rgba(0,0,0,0.08)",

          mb: 5,
        }}
      >

        {/* HEADER */}

        <Box
          sx={{
            textAlign: "center",
            mb: 5,
          }}
        >

          <PsychologyIcon
            sx={{
              fontSize: 70,
              color: "#7c3aed",
              mb: 2,
            }}
          />

          <Typography
            sx={{
              fontWeight: 900,

              color: "#0f172a",

              fontSize: {
                xs: "3rem",
                md: "5rem",
              },

              lineHeight: 1.1,

              mb: 2,
            }}
          >
            AI Project Generator
          </Typography>

          <Typography
            sx={{
              color: "#475569",

              fontSize: "1.2rem",
            }}
          >
            Generate innovative AI/ML project ideas instantly using AI.
          </Typography>

        </Box>

        {/* INPUT */}

        <TextField
          fullWidth
          placeholder="Enter domain (e.g. NLP, Healthcare AI, Computer Vision)"
          value={domain}
          onChange={(e) =>
            setDomain(
              e.target.value
            )
          }
          sx={{
            mb: 4,

            "& .MuiOutlinedInput-root": {

              borderRadius: "20px",

              fontSize: "1.1rem",

              background: "#f8fafc",
            },
          }}
        />

        {/* BUTTON */}

        <Button
          fullWidth
          variant="contained"
          onClick={generateProjects}
          disabled={loading}
          sx={{
            py: 2,

            borderRadius: "16px",

            fontSize: "1rem",

            fontWeight: 700,

            textTransform: "none",

            background: "#2563eb",

            boxShadow:
              "0 6px 18px rgba(37,99,235,0.3)",

            "&:hover": {
              background: "#1d4ed8",
            },
          }}
        >

          {loading ? (

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >

              <CircularProgress
                size={20}
                sx={{
                  color: "white",
                }}
              />

              Generating...

            </Box>

          ) : (

            "Generate Ideas"

          )}

        </Button>

      </Paper>

      {/* GENERATED PROJECTS */}

      {projects && (

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",

            gap: 3,
          }}
        >

          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,

              color: "#0f172a",

              mb: 1,
            }}
          >
            Generated Ideas
          </Typography>

          {formattedProjects.map(

            (project, index) => (

              <Paper
                key={index}

                elevation={0}

                sx={{
                  p: 4,

                  borderRadius: "24px",

                  background: "#ffffff",

                  boxShadow:
                    "0 6px 20px rgba(0,0,0,0.06)",
                }}
              >

                <Typography
                  sx={{
                    color: "#334155",

                    lineHeight: 1.9,

                    whiteSpace: "pre-line",

                    fontSize: "1rem",
                  }}
                >
                  {project.trim()}
                </Typography>

              </Paper>

            )

          )}

        </Box>

      )}

    </Container>

  );

}