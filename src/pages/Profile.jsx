import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getUserByUserId } from "../services/Userservices";
import { getCurrentUserId } from "../auth/Index";

export default function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserByUserId(getCurrentUserId());
        console.log(getCurrentUserId());
        setUser(data);
      } catch (error) {
        console.error("❌ Failed to fetch user profile:", error);
      }
    };
    fetchProfile();
  }, []);

  if (!user) {
    return (
      <Box textAlign="center" mt={10}>
        <Typography variant="h6">Loading profile...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      {/* Profile Header */}
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} sm={4}>
            <Avatar
              src={user.avatar}
              alt={user.first_name}
              sx={{ width: 120, height: 120, mx: "auto" }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" fontWeight="bold">
              {user.first_name + " " + user.last_name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {user.email}
            </Typography>
            <Box mt={2}>
              <Button variant="outlined" color="primary">
                Edit Profile
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Activity or Preferences */}
      <Box mt={6}>
        <Typography variant="h6" gutterBottom>
          Your Collections
        </Typography>
        <Divider sx={{ mb: 3 }} />
        {/* Add logic to map saved poems/books here */}
        <Typography color="text.secondary">
          You haven't saved any poems or books yet.
        </Typography>
      </Box>

      <Box mt={6}>
        <Typography variant="h6" gutterBottom>
          Reading History
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Typography color="text.secondary">
          No reading history available.
        </Typography>
      </Box>
    </Container>
  );
}
