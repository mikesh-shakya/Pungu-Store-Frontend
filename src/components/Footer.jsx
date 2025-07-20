import React from "react";
import { Box, Container, Grid, Link, Typography, Divider } from "@mui/material";

const footerLinks = {
  Company: ["About", "Careers", "Contact"],
  Support: ["Help Center", "Terms of Service", "Privacy Policy"],
  Resources: ["Blog", "Developers", "API"],
};

function Footer() {
  return (
    // <Box
    //   component="footer"
    //   sx={{
    //     backgroundColor: "background.paper",
    //     color: "white",
    //     mt: "auto",
    //     pt: 6,
    //     pb: 4,
    //   }}
    // >
    <Container maxWidth="xxl" disableGutters>
      <Box
        component="footer"
        sx={{
          backgroundColor: "background.paper",
          color: "white",
          pt: 6,
          pb: 4
        }}
      >
        <Divider sx={{ my: 4, borderColor: "rgba(255, 255, 255, 0.2)" }} />
        <Grid
          container
          spacing={4}
          justifyContent="space-evenly"
          alignItems="flex-start"
          p={1}
        >
          {Object.entries(footerLinks).map(([section, links]) => (
            <Grid item xs={12} sm={4} md={4} key={section}>
              <Typography variant="h6" gutterBottom>
                {section}
              </Typography>
              {links.map((link) => (
                <Link
                  key={link}
                  href={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                  underline="hover"
                  color="inherit"
                  sx={{
                    display: "block",
                    mb: 0.5,
                    fontSize: "0.9rem",
                    "&:hover": { color: "grey.300" },
                  }}
                >
                  {link}
                </Link>
              ))}
            </Grid>
          ))}
        </Grid>
        <Box textAlign="center">
          <Typography variant="body2" color="inherit">
            © {new Date().getFullYear()} Pungu Store. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Footer;
