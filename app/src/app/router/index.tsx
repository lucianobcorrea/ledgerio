import Login from "@/ui/screens/auth/Login";
import Register from "@/ui/screens/auth/Register";
import Dashboard from "@/ui/screens/dashboard/Dashboard";
import CreateEmployee from "@/ui/screens/employees/CreateEmployee";
import ListEmployees from "@/ui/screens/employees/ListEmployees";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/employees",
    children: [
      {
        index: true,
        element: <ListEmployees />,
      },
      {
        path: "create",
        element: <CreateEmployee />,
      }
    ]
  },
]);
