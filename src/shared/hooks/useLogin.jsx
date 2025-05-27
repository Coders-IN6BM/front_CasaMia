import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { login as loginRequest } from "../../services";
import { useState } from "react";

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const login = async (credentials, password) => {
        setIsLoading(true);
        const response = await loginRequest({
            ...credentials,
            password
        });
        setIsLoading(false);

        if(response.error){
            toast.error(
                response.e?.response?.data?.message ||
                response.e?.response?.data?.error ||
                "Error iniciar sesión"
            );
            return;
        } else {
            toast.success(response.data.message);
        }

        const { userDetails } = response.data;
        localStorage.setItem('user', JSON.stringify(userDetails));
        navigate("/");
    }

    return {
        login,
        isLoading
    }
}