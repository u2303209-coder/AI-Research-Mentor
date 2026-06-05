import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Grid,
} from "@mui/material";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import { useState } from "react";
import axios from "axios";


export default function PdfQA() {

  const [file, setFile] = useState(null);


  

  

  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState("");
  const [pdfViewerUrl, setPdfViewerUrl] = useState("");

  const [loading, setLoading] = useState(false);

  // ---------------- UPLOAD PDF ---------------- //

  const handleFileChange = async (e) => {

    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    setFile(selectedFile);

    setPdfViewerUrl(
  `http://127.0.0.1:8000/uploads/${selectedFile.name}`
);

    setPageNumber(1);

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

    if (!question.trim()) return;

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

      console.log(error);

      setAnswer(
        "Error generating response."
      );

    }

    setLoading(false);

  };

  return (

    <Container
  maxWidth={false}
  disableGutters
  sx={{
    py: 4,
    px: 3,
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
              }}
            >
              Click to upload a PDF
            </Typography>

          </Box>

        </label>

      </Paper>

      {/* FILE NAME */}

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
          }}
        >

          <PictureAsPdfIcon
            sx={{
              color: "#ef4444",
            }}
          />

          <Box>

            <Typography
              sx={{
                fontWeight: 700,
              }}
            >
              {file.name}
            </Typography>

            <Typography
              sx={{
                color: "#64748b",
              }}
            >
              Ready for analysis
            </Typography>

          </Box>

        </Paper>

      )}

      {/* MAIN LAYOUT */}

      <Grid
  container
  spacing={3}
  sx={{
    width: "100%",
  }}
>

        {/* PDF VIEWER */}

        <Grid
  size={{
    xs: 12,
    md: 8,
  }}
>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "24px",
              minHeight: "800px",
              boxShadow:
                "0 4px 20px rgba(0,0,0,0.08)",
              overflow: "auto",
            }}
          >

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 3,
              }}
            >
              PDF Preview
            </Typography>

            <Box
  sx={{
    width: "100%",
    height: "900px",
    borderRadius: "12px",
    overflow: "hidden",
  }}
>
  {pdfViewerUrl ? (
    <iframe
      src={pdfViewerUrl}
      width="100%"
      height="100%"
      title="PDF Viewer"
      style={{
        border: "none",
      }}
    />
  ) : (
    <Typography
      sx={{
        color: "#64748b",
        p: 2,
      }}
    >
      Upload a PDF to preview it here.
    </Typography>
  )}
</Box>

          </Paper>

        </Grid>

        {/* QUESTION + ANSWER */}

        <Grid
  size={{
    xs: 12,
    md: 4,
  }}
>

          <TextField
            fullWidth
            multiline
            rows={5}
            label="Ask question from PDF"
            value={question}
            onChange={(e) =>
              setQuestion(
                e.target.value
              )
            }
            sx={{
              mb: 3,
            }}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            disabled={
              loading ||
              !question
            }
            onClick={askQuestion}
            sx={{
              py: 2,
              borderRadius: "18px",
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            {loading
              ? "Analyzing..."
              : "Ask Question"}
          </Button>

          {answer && (

            <Paper
              elevation={0}
              sx={{
                mt: 4,
                p: 4,
                borderRadius: "24px",
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
                sx={{
                  whiteSpace: "pre-wrap",
                  lineHeight: 2,
                  color: "#374151",
                }}
              >
                {answer}
              </Box>

            </Paper>

          )}

        </Grid>

      </Grid>

    </Container>

  );

}