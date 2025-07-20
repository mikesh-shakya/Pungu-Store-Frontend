import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import BaseTemplate from "../components/BaseTemplate";
import PoemCard from "../components/PoemCard";

const featuredPoems = [
  {
    title: "Aaj Phir Dil Ne Ek Tamanna Ki",
    author: "Faiz Ahmed Faiz",
    image: "https://source.unsplash.com/400x250/?book,writing",
  },
  {
    title: "Hazaron Khwahishein Aisi",
    author: "Mirza Ghalib",
    image: "https://source.unsplash.com/400x250/?ink,poetry",
  },
  {
    title: "Tumhe Yaad Ho Ke Na Yaad Ho",
    author: "Ahmed Faraz",
    image: "https://source.unsplash.com/400x250/?paper,letter",
  },
];

function Home() {
  return (
    <BaseTemplate>
      {/* Hero Section */}
      <Box
        sx={{
          py: 10,
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Rediscover Urdu, Hindi & Persian Literature
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            A curated world of poetry, prose, and the timeless voices of legends
            like Ghalib, Faiz, and Iqbal.
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Explore Library
          </Button>
        </Container>
      </Box>

      {/* Featured Poems */}
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Container>
          <Typography pb={2} variant="h4" fontWeight="bold" gutterBottom>
            Featured Poems
          </Typography>
          <Grid container spacing={10}>
            {featuredPoems.map((poem) => (
              <PoemCard
                title={poem.title}
                author={poem.author}
                image={poem.image}
              ></PoemCard>
            ))}
          </Grid>
        </Container>
      </Box>
    </BaseTemplate>
  );
}

export default Home;
