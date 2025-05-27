import { DashboardPage } from "./pages/dashboard";

export const routes = [
    {path: "/*", element: <DashboardPage />},
    {patch: "/auth", element: <DashboardPage />},
]