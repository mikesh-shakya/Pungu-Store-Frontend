// AuthorDetailShowcase.jsx
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { getAuthor } from "../services/AuthorService";
import { getAllBooksByAuthor } from "../services/BooksService";
import BookCard from "../components/BookCard";

export default function AuthorDetail() {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [authorData, booksData] = await Promise.all([
          getAuthor(id),
          getAllBooksByAuthor(id),
        ]);
        setAuthor(authorData);
        setBooks(booksData);
      } catch (error) {
        console.error("❌ Failed to fetch author or books:", error);
      }
    };

    fetchData();
  }, [id]);

  // 🔄 Loading state
  if (!author) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <CircularProgress color="secondary" />
        <Typography mt={2} variant="h6" color="text.secondary">
          Gathering the voices...
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url(${author.profileImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        <Box
          sx={{
            p: 3,
            textAlign: "center",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontFamily: "'Noto Nastaliq Urdu', serif", fontWeight: 700 }}
          >
            {author.fullName}
          </Typography>
        </Box>
      </Box>

      {/* Bio Section */}
      <Grid container spacing={4} sx={{ px: { xs: 2, md: 8 }, py: 5 }}>
        <Grid item xs={12} md={4}>
          <Avatar
            src={author.profileImage}
            alt={author.fullName}
            sx={{
              width: 180,
              height: 180,
              mx: "auto",
              border: "4px solid #c4a484",
            }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Biography
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}
          >
            {author.bio}
          </Typography>
          <Box sx={{ mt: 2, fontSize: "0.9rem", color: "text.secondary" }}>
            <Typography>Born: {author.dateOfBirth}</Typography>
            <Typography>Nationality: {author.nationality}</Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Books Section */}
      <Box sx={{ px: { xs: 2, md: 8 }, mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Major Works
        </Typography>
        <Grid container spacing={2}>
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
                No books available for this author.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
}
