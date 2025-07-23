import { Container, Grid, Typography } from "@mui/material";
import AuthorCard from "../components/AuthorCard";
import BaseTemplate from "../components/BaseTemplate";
import { getAllAuthors } from "../services/AuthorService";
import { useEffect, useState } from "react";

function AuthorCatalog() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const data = await getAllAuthors();
        setAuthors(data);
      } catch (error) {
        console.error(
          "❌ Failed to fetch authors:",
          error?.response?.data || error.message || error
        );
        // Optional: show a toast, fallback UI, or update error state
      }
    };
    fetchAuthors();
  }, []);

  return (
    <BaseTemplate>
      <Container>
        <Typography pb={2} variant="h2" fontWeight="bold" gutterBottom>
          This is Author's page
        </Typography>
        <Grid container spacing={10}>
          {authors && authors.length > 0 ? (
            authors.map((author) => (
              <Grid key={author.id} item xs={12} sm={6} md={4}>
                <AuthorCard
                  name={author.name}
                  bio={author.bio}
                  image={author.image}
                  onClick={author.url}
                />
              </Grid>
            ))
          ) : (
            <>
                <AuthorCard />
                <AuthorCard />
                <AuthorCard />
            </>
          )}
        </Grid>
      </Container>
    </BaseTemplate>
  );
}
export default AuthorCatalog;
