import Login from "@/ui/screens/auth/Login";
import Register from "@/ui/screens/auth/Register";
import Dashboard from "@/ui/screens/dashboard/Dashboard";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
]);