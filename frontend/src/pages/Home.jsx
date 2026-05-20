import {

  Container,
  Typography,
  Paper,
  Box,
  Button

} from "@mui/material";

import PsychologyAltIcon
from "@mui/icons-material/PsychologyAlt";

import PictureAsPdfIcon
from "@mui/icons-material/PictureAsPdf";

import SmartToyIcon
from "@mui/icons-material/SmartToy";

function Home() {

  const scrollToFeatures = () => {

    const section =
      document.getElementById(
        "features-section"
      );

    section.scrollIntoView({

      behavior: "smooth"

    });

  };

  const features = [

    {

      title:
        "AI Project Generator",

      description:
        "Generate innovative AI/ML project ideas instantly using Large Language Models.",

      icon:
        <PsychologyAltIcon
          sx={{
            fontSize: 70,
            color: "#8b5cf6"
          }}
        />

    },

    {

      title:
        "PDF Question Answering",

      description:
        "Upload research papers and ask intelligent context-aware questions using RAG architecture.",

      icon:
        <PictureAsPdfIcon
          sx={{
            fontSize: 70,
            color: "#ef4444"
          }}
        />

    },

    {

      title:
        "AI Chatbot",

      description:
        "Interact with an AI assistant for technical explanations, AI concepts, and research guidance.",

      icon:
        <SmartToyIcon
          sx={{
            fontSize: 70,
            color: "#10b981"
          }}
        />

    }

  ];

  return (

    <Container
      maxWidth="xl"
    >

      {/* HERO SECTION */}

      <Box
        sx={{

          minHeight: "100vh",

          display: "flex",

          flexDirection: "column",

          justifyContent: "center",

          alignItems: "center",

          textAlign: "center"

        }}
      >

        <Typography
          variant="h1"
          fontWeight="bold"
          sx={{

            fontSize: {

              xs: "55px",

              md: "90px"

            }

          }}
        >

          AI-Powered
          <br />
          Research Mentor

        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{

            mt: 4,

            maxWidth: "900px",

            lineHeight: 1.8

          }}
        >

          An AI-driven platform for generating
          innovative project ideas,
          interacting with intelligent chatbots,
          and performing PDF Question Answering
          using Retrieval-Augmented Generation.

        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={scrollToFeatures}
          sx={{

            mt: 5,

            px: 5,

            py: 1.5,

            borderRadius: 3,

            fontSize: "18px",

            transition: "0.3s",

            "&:hover": {

              transform:
                "translateY(-3px)"

            }

          }}
        >

          Explore Features

        </Button>

      </Box>

      {/* FEATURES SECTION */}

      <Box
        id="features-section"
        sx={{

          pb: 10,

          display: "flex",

          justifyContent: "center",

          alignItems: "stretch",

          gap: 4,

          flexWrap: "wrap"

        }}
      >

        {features.map((feature, index) => (

          <Paper
            key={index}

            elevation={4}

            sx={{

              width: "350px",

              minHeight: "320px",

              p: 4,

              borderRadius: 5,

              textAlign: "center",

              display: "flex",

              flexDirection: "column",

              justifyContent: "center",

              transition:
                "all 0.3s ease",

              "&:hover": {

                transform:
                  "translateY(-10px) scale(1.03)",

                boxShadow: 10

              }

            }}
          >

            <Box sx={{ mb: 3 }}>
              {feature.icon}
            </Box>

            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
            >

              {feature.title}

            </Typography>

            <Typography
              color="text.secondary"
              sx={{

                lineHeight: 1.8,

                fontSize: "17px"

              }}
            >

              {feature.description}

            </Typography>

          </Paper>

        ))}

      </Box>

    </Container>

  );
}

export default Home;