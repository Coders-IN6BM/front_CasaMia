import React, { useState } from "react";
import PropTypes from "prop-types";
import { validatePassword, validatePasswordMessage } from "../../shared/validators";
import { useLogin } from "../../shared/hooks/useLogin.jsx";
import { Box, Button, TextField, Typography, CircularProgress, Paper } from "@mui/material";
import { Logo } from "../Logo.jsx";

export const Login = ({ switchAuthHandler }) => {
  const { login, isLoading } = useLogin();

  const [formState, setFormState] = useState({
    emailOrUsername: {
      value: "",
      isValid: false,
      showError: false,
    },
    password: {
      value: "",
      isValid: false,
      showError: false,
    },
  });

  // Validador para email O username (debe ser no vacío, si tiene @, email simple)
  const validateEmailOrUsername = (value) => {
    if (!value) return false;
    if (value.includes("@")) {
      // Validación simple de email para permitir login por email
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }
    // Si es username, no vacío y sin espacios
    return /^[A-Za-z0-9_.]+$/.test(value);
  };

  const validateEmailOrUsernameMessage = "Ingresa un email válido o tu usuario (sin espacios).";

  const handleInputValueChange = (event) => {
    const { value, name } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        value,
      },
    }));
  };

  const handleInputValidationOnBlur = (event) => {
    const { value, name } = event.target;
    let isValid = false;
    switch (name) {
      case "emailOrUsername":
        isValid = validateEmailOrUsername(value);
        break;
      case "password":
        isValid = validatePassword(value);
        break;
      default:
        break;
    }
    setFormState((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        isValid,
        showError: !isValid,
      },
    }));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const { emailOrUsername, password } = formState;
    const identifier = emailOrUsername.value.trim();
    const pw = password.value;

    // Detecta si es email o username
    let credentials = {};
    if (identifier.includes("@")) {
      credentials.email = identifier;
    } else {
      credentials.username = identifier;
    }
    login(credentials, pw);
  };

  const isSubmitDisabled =
    isLoading || !formState.emailOrUsername.isValid || !formState.password.isValid;

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        maxWidth: 380,
        mx: "auto",
        my: 8,
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Logo text="Inicio de sesión" />
      <form
        className="auth-form"
        style={{ width: "100%" }}
        onSubmit={handleLogin}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Ingresa tu usuario o email"
          name="emailOrUsername"
          value={formState.emailOrUsername.value}
          onChange={handleInputValueChange}
          type="text"
          onBlur={handleInputValidationOnBlur}
          error={formState.emailOrUsername.showError}
          helperText={formState.emailOrUsername.showError ? validateEmailOrUsernameMessage : ""}
          fullWidth
          margin="normal"
          autoComplete="username"
        />
        <TextField
          label="Ingresa tu contraseña"
          name="password"
          value={formState.password.value}
          onChange={handleInputValueChange}
          type="password"
          onBlur={handleInputValidationOnBlur}
          error={formState.password.showError}
          helperText={formState.password.showError ? validatePasswordMessage : ""}
          fullWidth
          margin="normal"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb: 1 }}
          disabled={isSubmitDisabled}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>
      </form>
      <Typography
        sx={{
          mt: 1,
          fontSize: 14,
          color: "primary.main",
          cursor: "pointer",
          textAlign: "center",
          textDecoration: "underline",
        }}
        onClick={switchAuthHandler}
        className="auth-form-switch-label"
      >
        ¿No tienes cuenta aún?... ¡Regístrate acá!
      </Typography>
    </Box>
  );
};

Login.propTypes = {
  switchAuthHandler: PropTypes.func.isRequired,
};