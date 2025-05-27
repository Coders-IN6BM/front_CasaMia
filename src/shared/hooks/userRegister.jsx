import { useNavigate } from "react-router-dom";
import { register as registerRequest } from "../../services";
import toast from "react-hot-toast";
import { useState } from "react";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (formData) => {
    setIsLoading(true);

    const response = await registerRequest(formData);

    setIsLoading(false);

    if (response.error) {
      toast.error(
        response.e?.response?.data?.message ||
        response.e?.response?.data?.error ||
        "Error al registrar la cuenta"
      );
      return;
    } else {
      toast.success(response.data.message);
    }

    navigate('/');
  };

  return {
    register,
    isLoading
  };
};