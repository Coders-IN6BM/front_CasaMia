import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  validateEmail,
  validatePassword,
  validateEmailMessage,
  validatePasswordMessage,
} from "../shared/validators";
import { Input } from "./input";
import { useLogin } from "../shared/hooks/useLogin";
import { Logo } from "./Logo";

export const Login = ({ switchAuthHandler }) => {
  const { login, isLoading } = useLogin();

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
  });

  const handleInputValueChange = (value, field) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        value,
      },
    }));
  };

  const handleInputValidationOnBlur = (value, field) => {
    let isValid = false;
    switch (field) {
      case "email":
        isValid = validateEmail(value);
        break;
      case "password":
        isValid = validatePassword(value);
        break;
      default:
        break;
    }
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        isValid,
        showError: !isValid,
      },
    }));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    login(formState.email.value, formState.password.value);
  };

  const isSubmitDisabled =
    isLoading || !formState.email.isValid || !formState.password.isValid;

  return (
    <div className="login-container">
      <Logo text="Inicio de sesión" />
      <form className="auth-form">
        <Input
          field="email"
          label="Ingresa tu email"
          value={formState.email.value}
          onChangeHandler={handleInputValueChange}
          type="text"
          onBlurHandler={handleInputValidationOnBlur}
          showErrorMessage={formState.email.showError}
          validationMessage={validateEmailMessage}
        />
        <Input
          field="password"
          label="Ingresa tu contraseña"
          value={formState.password.value}
          onChangeHandler={handleInputValueChange}
          type="text"
          onBlurHandler={handleInputValidationOnBlur}
          showErrorMessage={formState.password.showError}
          validationMessage={validatePasswordMessage}
        />
        <button onClick={handleLogin} disabled={isSubmitDisabled}>
          Login
        </button>
      </form>
      <span onClick={switchAuthHandler} className="auth-form-switch-label">
        ¿No tienes cuenta aút?... Registrate acá!!!
      </span>
    </div>
  );
};

Login.proptypes = {
  switchAuthHandler: PropTypes.func.isRequired,
};