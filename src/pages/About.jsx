import { Box, Container, Typography } from "@mui/material";
import BaseTemplate from "../components/BaseTemplate";

const About = () => {
  return (
    <BaseTemplate>
      {/* About Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Why PunguVerse?
          </Typography>
          <Typography variant="body1" color="text.secondary">
            We aim to preserve and promote classical and contemporary literary
            works in Urdu, Hindi, and Persian. Dive into our growing collection
            of poetry, ghazals, short stories, and critical essays curated for
            lovers of language and literature.
          </Typography>
        </Container>
      </Box>
    </BaseTemplate>
  );
};

export default About;
