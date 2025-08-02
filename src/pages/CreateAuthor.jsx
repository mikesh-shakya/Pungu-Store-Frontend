import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Divider,
  Container,
} from "@mui/material";

export default function CreateAuthor() {
  const fallbackImage = "https://source.unsplash.com/200x200/?person,portrait";
  const [author, setAuthor] = useState({
    name: "",
    bio: "",
    nationality: "",
    dateOfBirth: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthor({ ...author, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Author Data:", author);
    // TODO: Replace with API submission
  };

  return (
    <Container maxWidth="lg">
      <Box component="form" onSubmit={handleSubmit} sx={{ py: 5 }}>
        <Typography variant="h4" gutterBottom>
          Add New Author
        </Typography>

        <Grid container spacing={10}>
          {/* Form Column */}
          <Grid item xs={12} md={7}>
            <Card sx={{ mb: 4 }}>
              <CardHeader title="Basic Details" />
              <CardContent>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={author.name}
                  onChange={handleChange}
                  required
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  label="Nationality"
                  name="nationality"
                  value={author.nationality}
                  onChange={handleChange}
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={author.dateOfBirth}
                  onChange={handleChange}
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  label="Short Bio"
                  name="bio"
                  multiline
                  minRows={4}
                  value={author.bio}
                  onChange={handleChange}
                  sx={{ mb: 3 }}
                />
              </CardContent>
            </Card>

            <Box sx={{ textAlign: "right" }}>
              <Button variant="outlined" sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Save Author
              </Button>
            </Box>
          </Grid>

          {/* Preview Column */}
          <Grid item xs={12} md={5}>
            <Card sx={{ p: 2 }}>
              <CardHeader title="Preview" />
              <CardContent sx={{ textAlign: "center" }}>
                <Avatar
                  src={fallbackImage}
                  alt={author.name || "Author Name"}
                  sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
                />
                <Typography variant="h6">
                  {author.name || "Author Name"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {author.nationality || "Nationality"}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1">
                  {author.bio || "Author bio will appear here."}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
