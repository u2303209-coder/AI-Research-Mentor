import { useState } from "react";

import API from "../api/api";

import ReactMarkdown from "react-markdown";

import {

  Container,
  Typography,
  Button,
  Box,
  TextField,
  CircularProgress,
  Paper

} from "@mui/material";

import PictureAsPdfIcon
from "@mui/icons-material/PictureAsPdf";

function PdfQA() {

  const [file, setFile] =
    useState(null);

  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const uploadPDF = async () => {

    if (!file) return;

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    await API.post(
      "/upload-pdf",
      formData
    );
  };

  const askQuestion =
    async () => {

      setLoading(true);

      try {

        await uploadPDF();

        const res =
          await API.post(
            "/ask-pdf",
            { question }
          );

        setAnswer(
          res.data.response
        );

      } catch (error) {

        console.log(error);

      }

      setLoading(false);
    };

  return (

    <Container
      maxWidth="lg"
      sx={{
        mt: 6,
        mb: 8
      }}
    >

      {/* HEADER */}

      <Box
        sx={{
          mb: 5
        }}
      >

        <Typography
          variant="h3"
          fontWeight="bold"
        >

          PDF Question Answering

        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            mt: 1,
            fontSize: "17px"
          }}
        >

          Upload research papers and ask
          intelligent context-aware questions
          using Retrieval-Augmented Generation.

        </Typography>

      </Box>

      {/* UPLOAD SECTION */}

      <Paper
        elevation={1}

        sx={{

          border:
            "1px solid #dbe2ea",

          borderRadius: 4,

          p: 4,

          backgroundColor:
            "#ffffff"

        }}
      >

        <input
          hidden
          id="pdf-upload"
          type="file"

          onChange={(e) =>
            setFile(
              e.target.files[0]
            )
          }
        />

        <label htmlFor="pdf-upload">

          <Box
            sx={{

              border:
                "2px dashed #cbd5e1",

              borderRadius: 3,

              p: 5,

              textAlign: "center",

              cursor: "pointer",

              transition: "0.3s",

              backgroundColor:
                "#f8fafc",

              "&:hover": {

                borderColor:
                  "#2563eb",

                backgroundColor:
                  "#eff6ff"

              }

            }}
          >

            <PictureAsPdfIcon
              sx={{
                fontSize: 55,
                color: "#ef4444"
              }}
            />

            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                mt: 2
              }}
            >

              Upload PDF Document

            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 1
              }}
            >

              Drag & drop your PDF here
              or click to browse

            </Typography>

          </Box>

        </label>

        {/* FILE PREVIEW */}

        {file && (

          <Box
            sx={{

              mt: 3,

              display: "flex",

              alignItems: "center",

              gap: 2,

              p: 2,

              borderRadius: 3,

              backgroundColor:
                "#f1f5f9"

            }}
          >

            <PictureAsPdfIcon
              sx={{
                color: "#ef4444"
              }}
            />

            <Box>

              <Typography
                fontWeight="bold"
              >

                {file.name}

              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >

                Ready for analysis

              </Typography>

            </Box>

          </Box>

        )}

      </Paper>

      {/* QUESTION SECTION */}

      <Box sx={{ mt: 5 }}>

        <TextField
          fullWidth
          multiline
          rows={4}

          label="Ask question from PDF"

          value={question}

          onChange={(e) =>
            setQuestion(
              e.target.value
            )
          }
        />

        <Button
          fullWidth
          variant="contained"

          size="large"

          sx={{

            mt: 3,

            py: 1.5,

            borderRadius: 3,

            fontSize: "16px"

          }}

          onClick={askQuestion}

          disabled={loading}
        >

          {loading
            ? "Analyzing..."
            : "Ask Question"}

        </Button>

      </Box>

      {/* LOADING */}

      {loading && (

        <Box
          sx={{

            display: "flex",

            justifyContent:
              "center",

            mt: 4

          }}
        >

          <CircularProgress />

        </Box>

      )}

      {/* ANSWER */}

      {answer && (

        <Paper
          elevation={2}

          sx={{

            mt: 5,

            p: 4,

            borderRadius: 4,

            backgroundColor:
              "#ffffff"

          }}
        >

          <ReactMarkdown>
            {answer}
          </ReactMarkdown>

        </Paper>

      )}

    </Container>

  );
}

export default PdfQA;