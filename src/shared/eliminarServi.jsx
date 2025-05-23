import { useState } from "react";
import { eliminarServicioExtra } from "../../services";

export const useEliminarServicioExtra = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const eliminar = async (id) => {
        setLoading(true);
        setError("");
        setSuccess(false);
        const result = await eliminarServicioExtra(id);
        if (!result.error) {
            setSuccess(true);
        } else {
            setError(result.message || "Error al eliminar el servicio extra.");
        }
        setLoading(false);
    };

    return { eliminar, loading, error, success };
};
