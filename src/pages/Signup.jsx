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
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../services/Userservices";
import { toast } from "react-toastify";

// Field configuration
const formFields = [
  { name: "firstName", label: "First Name", type: "text", required: true },
  { name: "middleName", label: "Middle Name", type: "text", required: false },
  { name: "lastName", label: "Last Name", type: "text", required: true },
  { name: "username", label: "Username", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "password", label: "Password", type: "password", required: true },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    required: true,
  },
];

const SignupPage = () => {
  const initialFormState = Object.fromEntries(
    formFields.map((field) => [field.name, ""])
  );

  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();

  const formIsValid =
    formFields
      .filter((field) => field.required)
      .every(({ name }) =>
        typeof form[name] === "string"
          ? form[name].trim() !== ""
          : form[name] !== null && form[name] !== undefined
      ) &&
    Object.values(errors).every((err) => !err) &&
    acceptedTerms;

  const getFieldError = (name, value, compareTo = null) => {
    switch (name) {
      case "firstName":
      case "lastName":
      case "username":
        if (!value.trim())
          return `${name.replace(/^\w/, (c) => c.toUpperCase())} is required`;
        break;
      case "email":
        if (!value) return "Email is required";
        if (!/^\S+@\S+\.\S+$/.test(value)) return "Enter a valid email";
        break;
      case "password":
        if (!value) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        if (!/[a-z]/.test(value) || !/[A-Z]/.test(value) || !/\d/.test(value)) {
          return "Password must include uppercase, lowercase, and a number";
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
    for (const field of formFields) {
      newErrors[field.name] = getFieldError(
        field.name,
        form[field.name],
        form.password
      );
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => !err);
  };

  const validateField = (name, value) => {
    const error = getFieldError(name, value, form.password);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (validate()) {
      signUp(form)
        .then(() => {
          toast.success("User is Registered successfully!");
          navigate("/login");
          setForm(initialFormState);
        })
        .catch((error) => {
          if (error.response) {
            toast.error(`❌ ${error.response.data.message}`);
          } else {
            toast.error("Something went wrong. Please try again.");
          }
        });
    }
  };

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
            Create an Account
          </Typography>
          <Box component="form" onSubmit={handleSignup} sx={{ mt: 2 }}>
            {formFields.map((field) => {
              const isPassword = field.type === "password";
              const show =
                field.name === "password"
                  ? showPassword
                  : field.name === "confirmPassword"
                    ? showConfirm
                    : false;

              const toggleShow =
                field.name === "password"
                  ? () => setShowPassword((prev) => !prev)
                  : field.name === "confirmPassword"
                    ? () => setShowConfirm((prev) => !prev)
                    : undefined;

              return (
                <TextField
                  key={field.name}
                  fullWidth
                  name={field.name}
                  label={field.label}
                  type={isPassword ? (show ? "text" : "password") : field.type}
                  variant="outlined"
                  margin="normal"
                  required={field.required}
                  value={form[field.name]}
                  onChange={handleChange}
                  onBlur={(e) => validateField(e.target.name, e.target.value)}
                  error={Boolean(errors[field.name])}
                  helperText={errors[field.name]}
                  InputProps={
                    isPassword
                      ? {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={toggleShow}>
                                {show ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }
                      : undefined
                  }
                />
              );
            })}

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
  );
};

export default SignupPage;
