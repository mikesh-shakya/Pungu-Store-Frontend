import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
  Box,
} from "@mui/material";

function AuthorCard({ name = "Unknown Author", bio, image }) {
  const fallbackImage = "https://source.unsplash.com/200x200/?person,portrait";

  return (
    <Card
      sx={{
        width: 200,
        height: 300,
        bgcolor: "background.paper",
        color: "text.primary",
        borderRadius: 3,
        boxShadow: 3,
        textAlign: "center",
        p: 2,
        transition: "transform 0.2s ease",
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
    >
      <Box display="flex" justifyContent="center" mb={2}>
        <Avatar
          src={image || fallbackImage}
          alt={name}
          sx={{ width: 100, height: 100 }}
        />
      </Box>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {name}
        </Typography>
        {bio && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {bio.length > 100 ? bio.substring(0, 100) + "..." : bio}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default AuthorCard;
