import { DashboardPage } from "./pages/dashboard";
import { AuthPage } from "./pages/auth/authPage";

export const routes = [
    {path: "/*", element: <DashboardPage />},
    {path: "/auth", element: <AuthPage />},
]