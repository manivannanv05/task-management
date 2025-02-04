
import React from "react";
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router";

import Registration from "./Components/register";
import Dashboard from "./Components/dashboard";
import Login from "./Components/login";
import ProtectedRoute from "./Components/protectedRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />

    },
    {
        path: '/signup',
        element: <Registration />
    },
    {
        path: '/dashboard',
        element: (<ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>)

    }
])


const AppLayout = () => {
    return (
        <div className="app">
            <RouterProvider router={router} />
        </div>
    )
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
