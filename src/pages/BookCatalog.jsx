import { Container, Grid, Typography } from "@mui/material";
import BaseTemplate from "../components/BaseTemplate";
import BookCard from "../components/BookCard";
import { useEffect, useState } from "react";
import { getAllBooks } from "../services/BooksService";

function BookCatalog() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks();
        setBooks(data);
      } catch (error) {
        console.error(
          "❌ Failed to fetch books:",
          error?.response?.data || error.message || error
        );
        // Optional: show a toast, fallback UI, or update error state
      }
    };
    fetchBooks();
  }, []);

  return (
    <BaseTemplate>
      <Container>
        <Typography pb={2} variant="h2" fontWeight="bold" gutterBottom>
          This is books's page
        </Typography>
        <Grid container spacing={10}>
          {books && books.length > 0 ? (
            books.map((book) => (
              <Grid key={book.id} xs={12} sm={6} md={4}>
                <BookCard
                  title={book.title}
                  author={book.author}
                  image={book.image}
                  description={book.description}
                  onClick={book.url}
                />
              </Grid>
            ))
          ) : (
            <>
              <BookCard />
              <BookCard />
              <BookCard />
            </>
          )}
        </Grid>
      </Container>
    </BaseTemplate>
  );
}
export default BookCatalog;
