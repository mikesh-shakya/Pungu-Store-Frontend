import {
  Box,
  Container,
  Grid,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import BookCard from "../components/BookCard";
import { useEffect, useState } from "react";
import { getAllBooks } from "../services/BooksService";
import { Link } from "react-router-dom";

function BookCatalog() {
  const [books, setBooks] = useState(null);
   const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const fetchBooks = async (sortFields) => {
      try {
        const data = await getAllBooks(sortFields);
        setBooks(data);
      } catch (error) {
        console.error(
          "❌ Failed to fetch books:",
          error?.response?.data || error.message || error
        );
      }
    };
    fetchBooks(sortBy);
  }, [sortBy]);

   const handleSortChange = (event) => {
     const value = event.target.value;
     setSortBy(value ? [value] : []);
   };

  // ✅ FIXED: Return loading screen properly
  if (!books) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <CircularProgress color="secondary" />
        <Typography mt={2} variant="h6" color="text.secondary">
          Fetching the verses...
        </Typography>
      </Box>
    );
  }

  return (
    <Container
      maxWidth="lg"
      disableGutters
      sx={{
        px: { xs: 2, md: 6 },
        maxWidth: "100%",
      }}
    >
      <Box sx={{ py: 3, textAlign: "center" }}>
        <Typography variant="h3" fontWeight="bold">
          Explore Books
        </Typography>

        {/* Sorting Dropdown */}
        <Box
          sx={{
            my: 4,
            display: "flex",
            alignItems: "center",
          }}
        >
          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy[0] || ""}
              onChange={handleSortChange}
              label="Sort By"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="authorId">Author</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={6}>
          {Array.isArray(books) && books.length > 0 ? (
            books.map((book) => (
              <Grid item key={book.bookId} xs={12} sm={6} md={4} lg={3}>
                <Link
                  to={`/books/${book.bookId}`}
                  style={{ textDecoration: "none" }}
                >
                  <BookCard
                    title={book.title || "Unknown Book"}
                    author={book.authorName || "Unknown Author"}
                    image={book.image}
                    description={book.description}
                  />
                </Link>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography textAlign="center" color="text.secondary">
                No books found.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
}

export default BookCatalog;
