import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import BaseTemplate from "../components/BaseTemplate";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../services/Userservices";
import { toast } from "react-toastify";

const SignupPage = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const formIsValid =
    Object.values(form).every((val) => val.trim() !== "") &&
    Object.values(errors).every((err) => !err) &&
    acceptedTerms;

  const getFieldError = (name, value, compareTo = null) => {
    switch (name) {
      case "fullName":
        if (!value.trim()) return "Full name is required";
        break;
      case "email":
        if (!value) return "Email is required";
        if (!/^\S+@\S+\.\S+$/.test(value)) return "Enter a valid email";
        break;
      case "password":
        {
          if (!value) return "Password is required";
          if (value.length < 6) return "Password must be at least 6 characters";

          const hasLowercase = /[a-z]/.test(value);
          const hasUppercase = /[A-Z]/.test(value);
          const hasDigit = /[0-9]/.test(value);
          // const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

          if (!hasLowercase || !hasUppercase || !hasDigit) {
            return "Password must include at least 1 uppercase, 1 lowercase and a number";
          }
        }
        break;
      case "confirmPassword":
        if (!value) return "Please confirm your password";
        if (value !== compareTo) return "Passwords do not match";
        break;
      default:
        return "";
    }
    return "";
  };

  const validate = () => {
    const newErrors = {};
    for (const key in form) {
      newErrors[key] = getFieldError(key, form[key], form.password);
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => !err);
  };

  const validateField = (name, value) => {
    const error = getFieldError(name, value, form.password);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Signup data:", form);
      // Submit to server here
      signUp(form)
        .then((resp) => {
          console.log(resp);
          toast.success("User is Registered successfully !!!");
          navigate("/login");
          setForm({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          });
        })
        .catch((error) => {
          if (error.response) {
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
            Create an Account
          </Typography>
          <Box
            component="form"
            onSubmit={handleSignup}
            noValidate
            autoComplete="off"
            sx={{ mt: 2 }}
          >
            <TextField
              fullWidth
              name="fullName"
              label="Full Name"
              type="text"
              variant="outlined"
              margin="normal"
              required
              value={form.fullName}
              onChange={handleChange}
              onBlur={(e) => validateField(e.target.name, e.target.value)}
              error={Boolean(errors.fullName)}
              helperText={errors.fullName}
            />
            <TextField
              fullWidth
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              required
              value={form.email}
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
              value={form.password}
              onChange={handleChange}
              onBlur={(e) => validateField(e.target.name, e.target.value)}
              error={Boolean(errors.password)}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirm ? "text" : "password"}
              variant="outlined"
              margin="normal"
              required
              value={form.confirmPassword}
              onChange={handleChange}
              onBlur={(e) => validateField(e.target.name, e.target.value)}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirm(!showConfirm)}>
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Typography variant="body1">
                  I agree to the terms and conditions*
                </Typography>
              }
              sx={{ mt: 2 }}
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              disabled={!formIsValid}
              type="submit"
              sx={{ mt: 3, py: 1.5 }}
            >
              Sign Up
            </Button>
          </Box>
          <Box mt={3} textAlign="center">
            <Typography variant="body2">
              Already have an account?{" "}
              <Link
                to="/login"
                style={{ color: "#90caf9", textDecoration: "underline" }}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </BaseTemplate>
  );
};

export default SignupPage;
