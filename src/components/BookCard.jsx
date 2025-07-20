import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Avatar,
} from "@mui/material";

function BookCard({
  title = "Lord of the Rings",
  author = "Unknown Author",
  image,
  description,
  onClick,
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
        transition: "transform 0.2s ease",
        "&:hover": {
          transform: "scale(1.03)",
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
        {description && (
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            {description.length > 100
              ? description.substring(0, 100) + "..."
              : description}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onClick}>
          Read More
        </Button>
      </CardActions>
    </Card>
  );
}

export default BookCard;
