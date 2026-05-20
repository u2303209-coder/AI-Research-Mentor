import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box
} from "@mui/material";

import { Link } from "react-router-dom";

function Navbar() {

  return (

    <AppBar position="static">

      <Toolbar>

        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
        >
          Research Mentor AI
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>

          <Button
            color="inherit"
            component={Link}
            to="/"
          >
            Home
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/project"
          >
            Projects
          </Button>

            
          

          <Button
            color="inherit"
            component={Link}
            to="/pdfqa"
          >
            PDF QA
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/chat"
          >
            Chatbot
          </Button>

        </Box>

      </Toolbar>

    </AppBar>

  );
}

export default Navbar;