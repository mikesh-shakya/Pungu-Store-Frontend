import { Container, Grid, Typography } from "@mui/material";
import AuthorCard from "../components/AuthorCard";
import BaseTemplate from "../components/BaseTemplate";

function AuthorCatalog() {
  return (
    <BaseTemplate>
      <Container>
        <Typography pb={2} variant="h2" fontWeight="bold" gutterBottom>
          This is Author's page
        </Typography>
        <Grid container spacing={10}>
          <AuthorCard />
          <AuthorCard />
        </Grid>
      </Container>
    </BaseTemplate>
  );
}
export default AuthorCatalog;
