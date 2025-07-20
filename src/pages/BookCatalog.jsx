import { Container, Grid, Typography } from "@mui/material";
import BaseTemplate from "../components/BaseTemplate";
import BookCard from "../components/BookCard";

function BookCatalog() {
  return (
    <BaseTemplate>
      <Container>
        <Typography pb={2} variant="h2" fontWeight="bold" gutterBottom>
          This is books's page
        </Typography>
        <Grid container spacing={10}>
          <BookCard />
          <BookCard />
        </Grid>
      </Container>
    </BaseTemplate>
  );
}
export default BookCatalog;
