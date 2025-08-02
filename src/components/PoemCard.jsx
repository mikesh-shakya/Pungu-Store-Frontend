import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
} from "@mui/material";

function PoemCard({
  title = "Lord of the Rings",
  author = "Unknown Author",
  image
}) {
  const fallbackImage = "https://via.placeholder.com/300x400?text=No+Cover";
  return (
    <Card
      sx={{
        maxWidth: 300,
        bgcolor: "background.paper",
        color: "text.primary",
        borderRadius: 3,
        boxShadow: 3,
        p: 2,
        transition: "transform 0.25s ease",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Box display="flex" justifyContent="center" mb={2}>
        <Avatar
          src={image || fallbackImage}
          alt={title}
          sx={{ width: 100, height: 100 }}
        />
      </Box>

      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          by {author}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PoemCard;