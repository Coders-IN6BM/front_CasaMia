import PropTypes from "prop-types";
import React, { useState } from "react";
import { Logo } from "./Logo";
import {
  validateConfirmPassword,
  validateConfirmPasswordMessage,
  validateEmail,
  validateEmailMessage,
  validatePassword,
  validatePasswordMessage,
  validateUsername,
  validateUsernameMessage,
} from "../shared/validators";
import { Input } from "./input";
import { useRegister } from "../shared/hooks/useRegister";

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
      [field]: {
        ...prevState[field],
        isValid,
        showError: !isValid,
      },
    }));
  };

  const handleRegister = (event) =>{
    event.preventDefault();
    register(formState.email.value, formState.password.value, formState.username.value);
  }

  const isSubmitDisabled =
                    isLoading || 
                    !formState.email.isValid ||
                    !formState.password.isValid ||
                    !formState.username.isValid ||
                    !formState.passwordConfirm.isValid


  return (
    <div className="register-container">
      <Logo text="Formulario de Registro"/>
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
          field="username"
          label="Ingresa tu username"
          value={formState.username.value}
          onChangeHandler={handleInputValueChange}
          type="text"
          onBlurHandler={handleInputValidationOnBlur}
          showErrorMessage={formState.username.showError}
          validationMessage={validateUsernameMessage}
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
         <Input
          field="passwordConfirm"
          label="Re-ingresa tu contraseña"
          value={formState.passwordConfirm.value}
          onChangeHandler={handleInputValueChange}
          type="text"
          onBlurHandler={handleInputValidationOnBlur}
          showErrorMessage={formState.passwordConfirm.showError}
          validationMessage={validateConfirmPasswordMessage}
        />
        <button onClick={handleRegister} disabled={isSubmitDisabled}> 
          Crear Cuenta
        </button>
      </form>
      <span onClick={switchAuthHandler} className="auth-form-switch-label">
        ¿Ya tienes una cuenta?... Inicia sesión acá!!!
      </span>
    </div>
  );
};

Register.proptypes = {
  switchAuthHandler: PropTypes.func.isRequired,
};