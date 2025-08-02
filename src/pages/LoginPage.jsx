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
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/Userservices";
import { doLogin, getCurrentUser } from "../auth/Index";
import { toast } from "react-toastify";
import UserContext from "../context/UserContext";

const loginFields = [
  { name: "email", label: "Email", type: "email", required: true },
  { name: "password", label: "Password", type: "password", required: true },
];

const LoginPage = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(
    Object.fromEntries(loginFields.map((f) => [f.name, ""]))
  );
  const [errors, setErrors] = useState({});

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const getFieldError = (name, value) => {
    if (name === "email") {
      if (!value) return "Email is required";
      if (!/^\S+@\S+\.\S+$/.test(value)) return "Enter a valid email";
    }
    if (name === "password") {
      if (!value) return "Password is required";
    }
    return "";
  };

  const validate = () => {
    const newErrors = {};
    for (const field of loginFields) {
      newErrors[field.name] = getFieldError(field.name, form[field.name]);
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => !err);
  };

  const validateField = (name, value) => {
    const error = getFieldError(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      loginUser(form)
        .then((data) => {
          doLogin(data, () => {
            setUser({
              data: getCurrentUser(),
              login: true,
            });
            navigate("/");
          });
        })
        .catch((error) => {
          if (error.response?.data?.error) {
            toast.error(`${error.response.data.error}`);
          } else {
            toast.error("Something went wrong. Please try again.");
          }
        });
    }
  };

  const isFormValid =
    Object.values(form).every((val) => val.trim() !== "") &&
    Object.values(errors).every((err) => !err);

  return (
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
          {loginFields.map((field) => (
            <TextField
              key={field.name}
              fullWidth
              name={field.name}
              label={field.label}
              type={
                field.name === "password"
                  ? showPassword
                    ? "text"
                    : "password"
                  : field.type
              }
              variant="outlined"
              margin="normal"
              required={field.required}
              value={form[field.name]}
              onChange={handleChange}
              onBlur={(e) => validateField(e.target.name, e.target.value)}
              error={Boolean(errors[field.name])}
              helperText={errors[field.name]}
              InputProps={
                field.name === "password"
                  ? {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }
                  : undefined
              }
            />
          ))}

          <Box display="flex" justifyContent="flex-end" mt={1} mb={2}>
            <Link
              to="#"
              style={{
                color: "#90caf9",
                fontSize: "0.9rem",
                textDecoration: "underline",
              }}
            >
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
  );
};

export default LoginPage;
