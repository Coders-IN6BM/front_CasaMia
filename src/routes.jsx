import { DashboardPage } from "./pages/dashboard";
import { AuthPage } from "./pages/Auth/AuthPage";

export const routes = [
    {path: "/*", element: <DashboardPage />},
    {path: "/auth", element: <AuthPage />},
]