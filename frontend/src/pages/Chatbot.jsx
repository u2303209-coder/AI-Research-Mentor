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

import BoltIcon
from "@mui/icons-material/Bolt";

import PsychologyIcon
from "@mui/icons-material/Psychology";

import AutoAwesomeIcon
from "@mui/icons-material/AutoAwesome";

function Chatbot() {

  const [message, setMessage] =
    useState("");

  const [response, setResponse] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const sendMessage =
    async () => {

      if (!message) return;

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

  const features = [

    {

      title:
        "Instant AI Responses",

      description:
        "Get fast answers to technical and AI-related questions instantly.",

      icon:
        <BoltIcon
          sx={{
            color: "#2563eb",
            fontSize: 40
          }}
        />

    },

    {

      title:
        "AI/ML Knowledge",

      description:
        "Ask about Machine Learning, NLP, Deep Learning, and Generative AI.",

      icon:
        <PsychologyIcon
          sx={{
            color: "#7c3aed",
            fontSize: 40
          }}
        />

    },

    {

      title:
        "Smart Explanations",

      description:
        "Receive concise beginner-friendly answers in bullet points.",

      icon:
        <AutoAwesomeIcon
          sx={{
            color: "#10b981",
            fontSize: 40
          }}
        />

    }

  ];

  return (

    <Container
      maxWidth="lg"
      sx={{
        mt: 5,
        mb: 8
      }}
    >

      {/* HERO SECTION */}

      <Paper
        elevation={2}

        sx={{

          p: 3,

          borderRadius: 5,

          mb: 4,

          background:
            "linear-gradient(to right, #ffffff, #f8fafc)"

        }}
      >

        <Box
          sx={{
            textAlign: "center"
          }}
        >

          <SmartToyIcon
            sx={{
              fontSize: 55,
              color: "#10b981"
            }}
          />

          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ mt: 2 }}
          >

            AI Chatbot

          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 1,
              fontSize: "17px"
            }}
          >

            Ask technical questions and
            receive intelligent AI-powered
            responses instantly.

          </Typography>

        </Box>

      </Paper>

      {/* CHAT AREA */}

      <Paper
        elevation={2}

        sx={{

          p: 4,

          borderRadius: 5,

          backgroundColor:
            "#ffffff"

        }}
      >

        <Typography
          variant="h5"
          fontWeight="bold"
        >

          Start Conversation

        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 1 }}
        >

          Ask about AI, Machine Learning,
          Deep Learning, NLP,
          Generative AI and more.

        </Typography>

        {/* INPUT */}

        <TextField
          fullWidth
          multiline
          rows={7}

          placeholder=
            "Ask anything..."

          sx={{
            mt: 4
          }}

          value={message}

          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }
        />

        {/* BUTTON */}

        <Button
          fullWidth
          variant="contained"
          size="large"

          sx={{

            mt: 3,

            py: 1.6,

            borderRadius: 3,

            fontSize: "16px"

          }}

          onClick={sendMessage}

          disabled={loading}
        >

          {loading
            ? "Thinking..."
            : "Send Message"}

        </Button>

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

        {/* RESPONSE */}

        {response && (

          <Paper
            elevation={1}

            sx={{

              mt: 4,

              p: 3,

              borderRadius: 4,

              backgroundColor:
                "#f8fafc",

              border:
                "1px solid #e2e8f0"

            }}
          >

            <Typography
              fontWeight="bold"
              sx={{ mb: 2 }}
            >

              AI Response

            </Typography>

            <ReactMarkdown>
              {response}
            </ReactMarkdown>

          </Paper>

        )}

      </Paper>

      {/* FEATURE CARDS */}

      <Box
        sx={{

          mt: 3,

          display: "flex",

          gap: 3,

          flexWrap: "nowrap",

          justifyContent:
            "space-between"

        }}
      >

        {features.map(
          (feature, index) => (

            <Paper
              key={index}

              elevation={2}

              sx={{

                flex: 1,

                p: 3,

                borderRadius: 4,

                minHeight: 180,

                transition: "0.3s",

                display: "flex",

                flexDirection: "column",

                justifyContent: "center",

                "&:hover": {

                  transform:
                    "translateY(-5px)"

                }

              }}
            >

              <Box
                sx={{
                  mb: 2
                }}
              >

                {feature.icon}

              </Box>

              <Typography
                variant="h6"
                fontWeight="bold"
              >

                {feature.title}

              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mt: 1 }}
              >

                {feature.description}

              </Typography>

            </Paper>

          )
        )}

      </Box>

    </Container>

  );
}

export default Chatbot;