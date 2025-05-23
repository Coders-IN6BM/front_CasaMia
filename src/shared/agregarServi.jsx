import { useState } from "react";
import { createExtraService as agregarServicioExtra } from "../services";

export const useAgregarServicioExtra = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const agregar = async (form) => {
    setLoading(true);
    setError("");
    setSuccess(false);
    const result = await agregarServicioExtra(form.id, form.nombre, form.precio);
    if (!result.error) {
      setSuccess(true);
    } else {
      setError(result.message || "Error al agregar el servicio extra.");
    }
    setLoading(false);
  };

  return { agregar, loading, error, success };
};
