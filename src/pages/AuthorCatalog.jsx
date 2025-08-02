import {
  Box,
  Container,
  Grid,
  Typography,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from "@mui/material";
import AuthorCard from "../components/AuthorCard";
import { getAllAuthors } from "../services/AuthorService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AuthorCatalog() {
  const [authors, setAuthors] = useState(null);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const fetchAuthors = async (sortFields) => {
      try {
        const data = await getAllAuthors(sortFields);
        setAuthors(data);
      } catch (error) {
        console.error(
          "❌ Failed to fetch authors:",
          error?.response?.data || error.message || error
        );
      }
    };
    fetchAuthors(sortBy);
  }, [sortBy]);

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortBy(value ? [value] : []);
  };

  // 🔄 Loading state
  if (!authors) {
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
    <Container
      maxWidth="lg"
      disableGutters
      sx={{
        px: { xs: 2, md: 8 },
        maxWidth: "100%",
      }}
    >
      <Box sx={{ py: 3, textAlign: "center" }}>
        <Typography variant="h3" fontWeight="bold">
          Explore Authors
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
              <MenuItem value="fullName">Name</MenuItem>
              <MenuItem value="nationality">Nationality</MenuItem>
              <MenuItem value="dateOfBirth">Date of Birth</MenuItem>
              <MenuItem value="dateOfDeath">Date of Death</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={6}>
          {Array.isArray(authors) && authors.length > 0 ? (
            authors.map((author) => (
              <Grid item key={author.authorId} xs={12} sm={6} md={4} lg={3}>
                <Link
                  to={`/authors/${author.authorId}`}
                  style={{ textDecoration: "none" }}
                >
                  <AuthorCard
                    name={author.fullName || "Unknown Author"}
                    bio={author.bio}
                    image={author.image}
                  />
                </Link>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography textAlign="center" color="text.secondary">
                We will be adding authors soon...
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
}

export default AuthorCatalog;
