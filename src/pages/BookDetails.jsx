import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { getBook } from "../services/BooksService";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBook(id);
        setBook(data);
      } catch (error) {
        console.error("❌ Failed to fetch book:", error);
      }
    };
    fetchBook();
  }, [id]);

  // 🔄 Loading state
  if (!book) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <CircularProgress color="secondary" />
        <Typography mt={2} variant="h6" color="text.secondary">
          Loading the verses...
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url(${book.coverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        <Box sx={{ p: 3, borderRadius: 2, textAlign: "center" }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ fontFamily: "'Playfair Display', serif" }}
          >
            {book.title}
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 1, fontStyle: "italic" }}>
            by{" "}
            <Link
              to={`/authors/${book.authorId}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "bold",
              }}
              onMouseEnter={(e) =>
                (e.target.style.textDecoration = "underline")
              }
              onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
            >
              {book.authorName}
            </Link>
          </Typography>
        </Box>
      </Box>

      {/* Main Info */}
      <Grid container spacing={4} sx={{ px: { xs: 2, md: 8 }, py: 5 }}>
        <Grid item xs={12} md={4}>
          <Avatar
            variant="rounded"
            src={book.coverImage}
            alt={book.title}
            sx={{
              width: "100%",
              height: 300,
              objectFit: "cover",
              border: "4px solid #c4a484",
            }}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Book Summary
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}
          >
            {book.description || "No description available."}
          </Typography>
          <Box sx={{ mt: 2, fontSize: "0.9rem", color: "text.secondary" }}>
            <Typography>Genre: {book.genre || "Unknown"}</Typography>
            <Typography>Ratings: {book.averageRating}/5</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
