import { DashboardPage } from "./pages/dashboard";
import { AuthPage } from "./pages/Auth/AuthPage";
import { ServiciosPage } from "./pages/Servicios/Servicios.jsx";

export const routes = [
    {path: "/*", element: <DashboardPage />},
    {path: "/auth", element: <AuthPage />},
    { path: "/servicios", element: <ServiciosPage /> },
]