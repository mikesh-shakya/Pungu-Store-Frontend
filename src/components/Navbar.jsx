import { Link, useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import UserContext from "../context/UserContext";
import { useContext, useState } from "react";
import { doLogout } from "../auth/Index";

const pages = [
  { label: "Home", path: "/" },
  { label: "Books", path: "/books" },
  { label: "Authors", path: "/authors" },
  { label: "Add Author", path: "/add-author" },
  { label: "About", path: "/about" },
];

const settings = [
  { label: "Profile", path: "/profile" },
  { label: "Account", path: "/account" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Logout", path: "/logout" },
];

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleLogout = () => {
    doLogout(() => {
      setUser({
        data: null,
        login: false,
      });
      navigate("/");
    });
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Pungu Store
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="nav-menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="nav-menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages
                .filter(
                  ({ label }) =>
                    label !== "Add Author" ||
                    (label === "Add Author" && user.login)
                )
                .map(({ label, path }) => (
                  <MenuItem
                    key={label}
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to={path}
                  >
                    <Typography textAlign="center">{label}</Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Pungu Store
          </Typography>

          {/* Desktop Nav Links */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages
              .filter(
                ({ label }) =>
                  label !== "Add Author" ||
                  (label === "Add Author" && user.login)
              )
              .map(({ label, path }) => {
                const isActive = location.pathname === path;
                return (
                  <Button
                    key={label}
                    component={Link}
                    to={path}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      fontWeight: isActive ? "bold" : "normal",
                      display: "block",
                      borderBottom: isActive ? "2px solid white" : "none",
                    }}
                  >
                    {label}
                  </Button>
                );
              })}
          </Box>

          {/* User Menu */}
          {user.login ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.data} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="user-menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map(({ label, path }) => (
                  <MenuItem
                    key={label}
                    onClick={() => {
                      if (label === "Logout") {
                        handleLogout();
                      } else {
                        navigate(path);
                      }
                      handleCloseUserMenu();
                    }}
                  >
                    <Typography textAlign="center">{label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            // If NOT logged in, show Login and Signup buttons
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                component={Link}
                to="/login"
                color="inherit"
                sx={{ textTransform: "none" }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/signup"
                color="secondary"
                variant="contained"
                sx={{ textTransform: "none" }}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
