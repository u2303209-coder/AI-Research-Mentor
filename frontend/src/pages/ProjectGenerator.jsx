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

import PsychologyAltIcon
from "@mui/icons-material/PsychologyAlt";

function ProjectGenerator() {

  const [domain, setDomain] =
    useState("");

  const [result, setResult] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const generateProject =
    async () => {

      setLoading(true);

      try {

        const res =
          await API.post(
            "/generate-project",
            { domain }
          );

        setResult(
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

          borderRadius: 6,

          backdropFilter:
            "blur(10px)"

        }}
      >

        <Box
          sx={{
            textAlign: "center",
            mb: 4
          }}
        >

          <PsychologyAltIcon
            sx={{
              fontSize: 70,
              color: "#8b5cf6"
            }}
          />

          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{ mt: 2 }}
          >

            AI Project Generator

          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 2 }}
          >

            Generate innovative AI/ML
            project ideas using
            Large Language Models.

          </Typography>

        </Box>

        <TextField
          fullWidth
          label="Enter AI Domain"
          value={domain}
          onChange={(e) =>
            setDomain(e.target.value)
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
          onClick={generateProject}
          disabled={loading}
        >

          {loading
            ? "Generating..."
            : "Generate Project Ideas"}

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

        {result && (

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
              {result}
            </ReactMarkdown>

          </Paper>

        )}

      </Paper>

    </Container>

  );
}

export default ProjectGenerator;