import { Box, Container, Typography } from "@mui/material";

const About = () => {
  return (
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
  );
};

export default About;
