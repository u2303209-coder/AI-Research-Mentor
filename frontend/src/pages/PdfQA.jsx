import { useState } from "react";

import API from "../api/api";

import ReactMarkdown from "react-markdown";

import {

  Container,
  Paper,
  Typography,
  Button,
  Box,
  TextField,
  CircularProgress

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

    <Container maxWidth="md">

      <Paper
        elevation={4}
        sx={{

          p: 6,

          mt: 10,

          borderRadius: 6

        }}
      >

        <Box
          sx={{
            textAlign: "center",
            mb: 4
          }}
        >

          <PictureAsPdfIcon
            sx={{
              fontSize: 70,
              color: "#ef4444"
            }}
          />

          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{ mt: 2 }}
          >

            PDF Question Answering

          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 2 }}
          >

            Upload PDFs and ask
            intelligent context-aware
            questions using RAG.

          </Typography>

        </Box>

        <Button
          variant="contained"
          component="label"
          sx={{
            borderRadius: 3,
            py: 1.5
          }}
        >

          Upload PDF

          <input
            hidden
            type="file"
            onChange={(e) =>
              setFile(
                e.target.files[0]
              )
            }
          />

        </Button>

        {file && (

          <Typography
            sx={{ mt: 2 }}
          >

            Uploaded:
            {" "}
            {file.name}

          </Typography>

        )}

        <TextField
          fullWidth
          multiline
          rows={5}
          label="Ask question from PDF"
          sx={{ mt: 4 }}
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
        />

        <Button
          fullWidth
          variant="contained"
          size="large"
          sx={{
            mt: 4,
            py: 1.5,
            borderRadius: 3
          }}
          onClick={async () => {

            await uploadPDF();
            await askQuestion();

          }}
          disabled={loading}
        >

          {loading
            ? "Analyzing..."
            : "Ask Question"}

        </Button>

        {loading && (

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4
            }}
          >

            <CircularProgress />

          </Box>

        )}

        {answer && (

          <Paper
            elevation={2}
            sx={{

              mt: 5,

              p: 4,

              borderRadius: 4,

              backgroundColor:
                "#f8fafc"

            }}
          >

            <ReactMarkdown>
              {answer}
            </ReactMarkdown>

          </Paper>

        )}

      </Paper>

    </Container>

  );
}

export default PdfQA;