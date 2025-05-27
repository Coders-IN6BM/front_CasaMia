import PropTypes from "prop-types";
import React, { useState } from "react";
import { Logo } from "../Logo.jsx";
import {
  validateConfirmPassword,
  validateConfirmPasswordMessage,
  validateEmail,
  validateEmailMessage,
  validatePassword,
  validatePasswordMessage,
  validateUsername,
  validateUsernameMessage,
} from "../../shared/validators";
import { useRegister } from "../../shared/hooks/userRegister.jsx";
import { Box, Button, TextField, Typography, CircularProgress, Paper } from "@mui/material";

export const Register = ({ switchAuthHandler }) => {
  const { register, isLoading } = useRegister();

  const [formState, setFormState] = useState({
    email: {
      value: "",
      isValid: false,
      showError: false,
    },
    password: {
      value: "",
      isValid: false,
      showError: false,
    },
    username: {
      value: "",
      isValid: false,
      showError: false,
    },
    passwordConfirm: {
      value: "",
      isValid: false,
      showError: false,
    },
  });

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
      case "email":
        isValid = validateEmail(value);
        break;
      case "password":
        isValid = validatePassword(value);
        break;
      case "username":
        isValid = validateUsername(value);
        break;
      case "passwordConfirm":
        isValid = validateConfirmPassword(formState.password.value, value);
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

  const handleRegister = (event) => {
    event.preventDefault();
    register({
      email: formState.email.value,
      password: formState.password.value,
      username: formState.username.value,
    });
  };

  const isSubmitDisabled =
    isLoading ||
    !formState.email.isValid ||
    !formState.password.isValid ||
    !formState.username.isValid ||
    !formState.passwordConfirm.isValid;

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        maxWidth: 420,
        mx: "auto",
        my: 8,
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Logo text="Formulario de Registro" />
      <form
        className="auth-form"
        style={{ width: "100%" }}
        onSubmit={handleRegister}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Ingresa tu email"
          name="email"
          value={formState.email.value}
          onChange={handleInputValueChange}
          type="text"
          onBlur={handleInputValidationOnBlur}
          error={formState.email.showError}
          helperText={formState.email.showError ? validateEmailMessage : ""}
          fullWidth
          margin="normal"
          autoComplete="email"
        />
        <TextField
          label="Ingresa tu username"
          name="username"
          value={formState.username.value}
          onChange={handleInputValueChange}
          type="text"
          onBlur={handleInputValidationOnBlur}
          error={formState.username.showError}
          helperText={formState.username.showError ? validateUsernameMessage : ""}
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
          autoComplete="new-password"
        />
        <TextField
          label="Re-ingresa tu contraseña"
          name="passwordConfirm"
          value={formState.passwordConfirm.value}
          onChange={handleInputValueChange}
          type="password"
          onBlur={handleInputValidationOnBlur}
          error={formState.passwordConfirm.showError}
          helperText={formState.passwordConfirm.showError ? validateConfirmPasswordMessage : ""}
          fullWidth
          margin="normal"
          autoComplete="new-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb: 1 }}
          disabled={isSubmitDisabled}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Crear Cuenta"}
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
        ¿Ya tienes una cuenta?... Inicia sesión acá!!!
      </Typography>
    </Box>
  );
};

Register.propTypes = {
  switchAuthHandler: PropTypes.func.isRequired,
};