import { useState } from "react";
import { actualizarServicioExtra } from "../../services";

export const useActualizarServicioExtra = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const actualizar = async (id, data) => {
    setLoading(true);
    setError("");
    setSuccess(false);
    const result = await actualizarServicioExtra(id, data);
    if (!result.error) {
      setSuccess(true);
    } else {
      setError(result.message || "Error al actualizar el servicio extra.");
    }
    setLoading(false);
  };

  return { actualizar, loading, error, success };
};
