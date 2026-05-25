import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import { useState } from "react";

import axios from "axios";

export default function PdfQA() {

  const [file, setFile] = useState(null);

  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState("");

  const [loading, setLoading] = useState(false);

  // ---------------- UPLOAD PDF ---------------- //

  const handleFileChange = async (e) => {

    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    setFile(selectedFile);

    const formData = new FormData();

    formData.append(
      "file",
      selectedFile
    );

    try {

      await axios.post(

        "http://127.0.0.1:8000/upload-pdf",

        formData

      );

    } catch (error) {

      console.log(error);

    }

  };

  // ---------------- ASK QUESTION ---------------- //

  const askQuestion = async () => {

    if (!question) return;

    setLoading(true);

    setAnswer("");

    try {

      const res = await axios.post(

        "http://127.0.0.1:8000/ask-pdf",

        {
          question,
        }

      );

      setAnswer(
        res.data.response
      );

    } catch (error) {

      setAnswer(
        "Error generating response."
      );

    }

    setLoading(false);

  };

  return (

    <Container
      maxWidth="lg"
      sx={{
        py: 6,
      }}
    >

      {/* HEADER */}

      <Box
        sx={{
          textAlign: "center",
          mb: 6,
        }}
      >

        <PictureAsPdfIcon
          sx={{
            fontSize: 65,
            color: "#ef4444",
            mb: 2,
          }}
        />

        <Typography
          variant="h1"
          sx={{
            fontWeight: 850,
            color: "#0f172a",
            mb: 2,
            fontSize: {
              xs: "2.8rem",
              md: "4.5rem",
            },
            letterSpacing: "-2px",
            lineHeight: 1.1,
          }}
        >
          PDF Question
          <br />
          Answering
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "#475569",
            fontWeight: 400,
            maxWidth: "800px",
            mx: "auto",
            lineHeight: 1.8,
          }}
        >
          Upload PDFs and ask intelligent context-aware questions using RAG.
        </Typography>

      </Box>

      {/* UPLOAD SECTION */}

      <Paper
        elevation={0}
        sx={{
          p: 5,
          borderRadius: "28px",
          background: "#ffffff",
          border: "2px dashed #cbd5e1",
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.05)",
          textAlign: "center",
          mb: 4,
        }}
      >

        <input
          type="file"
          hidden
          id="pdf-upload"
          accept=".pdf"
          onChange={handleFileChange}
        />

        <label htmlFor="pdf-upload">

          <Box
            sx={{
              cursor: "pointer",
            }}
          >

            <PictureAsPdfIcon
              sx={{
                fontSize: 60,
                color: "#ef4444",
                mb: 2,
              }}
            />

            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 1,
                color: "#0f172a",
              }}
            >
              Upload PDF Document
            </Typography>

            <Typography
              sx={{
                color: "#64748b",
                fontSize: "1rem",
              }}
            >
              Drag & drop your PDF here or click to browse
            </Typography>

          </Box>

        </label>

      </Paper>

      {/* FILE DISPLAY */}

      {file && (

        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: "20px",
            background: "#f8fafc",
            display: "flex",
            alignItems: "center",
            gap: 2,
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.04)",
          }}
        >

          <PictureAsPdfIcon
            sx={{
              color: "#ef4444",
              fontSize: 40,
            }}
          />

          <Box>

            <Typography
              sx={{
                fontWeight: 700,
                color: "#111827",
              }}
            >
              {file.name}
            </Typography>

            <Typography
              sx={{
                color: "#64748b",
                fontSize: "0.9rem",
              }}
            >
              Ready for analysis
            </Typography>

          </Box>

        </Paper>

      )}

      {/* QUESTION INPUT */}

      <TextField
        fullWidth
        multiline
        rows={5}
        label="Ask question from PDF"
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
        sx={{
          mb: 4,
        }}
      />

      {/* BUTTON */}

      <Button
        fullWidth
        variant="contained"
        size="large"
        disabled={loading || !question}
        onClick={askQuestion}
        sx={{
          py: 2,
          borderRadius: "18px",
          fontSize: "1rem",
          fontWeight: 700,
          textTransform: "none",
          background: "#2563eb",

          "&:hover": {
            background: "#1d4ed8",
          },
        }}
      >

        {loading
          ? "Analyzing..."
          : "Ask Question"}

      </Button>

      {/* RESPONSE */}

      {answer && (

        <Paper
          elevation={0}
          sx={{
            mt: 5,
            p: 4,
            borderRadius: "24px",
            background: "#ffffff",
            boxShadow:
              "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 3,
            }}
          >

            <AutoAwesomeIcon
              sx={{
                color: "#2563eb",
              }}
            />

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
              }}
            >
              AI Response
            </Typography>

          </Box>

          <Box
            component="ul"
            sx={{
              pl: 3,
              m: 0,
            }}
          >

            {answer
              ?.split("•")
              .filter(
                (item) =>
                  item.trim() !== ""
              )
              .map((item, index) => (

                <Typography
                  component="li"
                  key={index}
                  sx={{
                    mb: 2,
                    lineHeight: 1.9,
                    color: "#374151",
                    fontSize: "1rem",
                  }}
                >
                  {item.trim()}
                </Typography>

              ))}

          </Box>

        </Paper>

      )}

    </Container>

  );

}