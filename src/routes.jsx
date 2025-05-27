import { DashboardPage } from "./pages/dashboard";
import { AuthPage } from "./pages/Auth/AuthPage";
import { ServiciosPage } from "./pages/Servicios/Servicios.jsx";
import { User } from "./pages/User/User.jsx"

export const routes = [
    {path: "/*", element: <DashboardPage />},
    {path: "/auth", element: <AuthPage />},
    { path: "/servicios", element: <ServiciosPage /> },
    {path: "/user", element: <User /> }
]