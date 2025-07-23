import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import BaseTemplate from "../components/BaseTemplate";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/Userservices";
import { doLogin } from "../auth/Index";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const isFormValid =
    form.email.trim() !== "" && form.password.trim() !== "" && !errors.email;

  const getFieldError = (name, value) => {
    if (name === "email") {
      if (!value) return "Email is required";
      if (!/^\S+@\S+\.\S+$/.test(value)) return "Enter a valid email";
    }
    return "";
  };

  const validateField = (name, value) => {
    const error = getFieldError(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validate = () => {
    const newErrors = {
      email: getFieldError("email", form.email),
    };
    setErrors(newErrors);
    return !newErrors.email;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      // proceed with login logic
      console.log("Logging in with", form);
      //Submit the data to server to generate token
      loginUser(form)
        .then((data) => {
          console.log(data);
          //save the data to localstorage
          doLogin(data, () => {
            console.log("Login deatil is saved to local storage");
            navigate("/")
          });

          toast.success("User LoggedIn Successfully...");
        })
        .catch((error) => {
          if (error.response.data.message) {
            toast.error(`❌ ${error.response.data.message}`);
          } else {
            toast.error("ohhoo!! It's not you, It's us.");
          }
        });
    }
  };

  return (
    <BaseTemplate>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "70vh",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 3,
            width: "100%",
            bgcolor: "background.paper",
            color: "text.primary",
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Login to Your Account
          </Typography>
          <Box
            component="form"
            onSubmit={handleLogin}
            noValidate
            autoComplete="off"
            sx={{ mt: 2 }}
          >
            <TextField
              fullWidth
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              required
              onChange={handleChange}
              onBlur={(e) => validateField(e.target.name, e.target.value)}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              required
              onChange={handleChange}
              onBlur={(e) => validateField(e.target.name, e.target.value)}
              error={Boolean(errors.password)}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box display="flex" justifyContent="flex-end" mt={1} mb={2}>
              <Link href="#" underline="hover" fontSize="0.9rem">
                Forgot password?
              </Link>
            </Box>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 1, py: 1.5 }}
              disabled={!isFormValid}
            >
              Login
            </Button>
          </Box>
          <Box mt={3} textAlign="center">
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link
                to="/signup"
                style={{ color: "#90caf9", textDecoration: "underline" }}
              >
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </BaseTemplate>
  );
};

export default LoginPage;
