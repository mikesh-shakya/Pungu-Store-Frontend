import { Box, Container } from "@mui/material";
import Footer from "./Footer";
import ResponsiveAppBar from "./Navbar";
import { Outlet } from "react-router-dom";

const BaseTemplate = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "background.paper",
        color: "text.primary",
      }}
    >
      <ResponsiveAppBar />

      <Container maxWidth={false} disableGutters sx={{ flex: 1, py: 5 }}>
        <Outlet />
      </Container>

      <Footer />
    </Box>
  );
};

export default BaseTemplate;
