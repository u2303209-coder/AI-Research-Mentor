import { useState } from "react";

import API from "../api/api";

import ReactMarkdown from "react-markdown";

import {

  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress

} from "@mui/material";

import SmartToyIcon
from "@mui/icons-material/SmartToy";

function Chatbot() {

  const [message, setMessage] =
    useState("");

  const [response, setResponse] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const sendMessage =
    async () => {

      setLoading(true);

      try {

        const res =
          await API.post(
            "/chat",
            { message }
          );

        setResponse(
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

          <SmartToyIcon
            sx={{
              fontSize: 70,
              color: "#10b981"
            }}
          />

          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{ mt: 2 }}
          >

            AI Chatbot

          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 2 }}
          >

            Ask technical questions and
            get AI-powered responses instantly.

          </Typography>

        </Box>

        <TextField
          fullWidth
          multiline
          rows={5}
          label="Ask Anything"
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
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
          onClick={sendMessage}
          disabled={loading}
        >

          {loading
            ? "Thinking..."
            : "Send Message"}

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

        {response && (

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
              {response}
            </ReactMarkdown>

          </Paper>

        )}

      </Paper>

    </Container>

  );
}

export default Chatbot;