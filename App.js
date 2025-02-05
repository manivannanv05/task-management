
import React from "react";
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router";

import Registration from "./Components/register";
import Dashboard from "./Components/dashboard";
import Login from "./Components/login";
import ProtectedRoute from "./Components/protectedRoute";
import AdminComponent from "./Components/admin";
import { RolesProvider } from "./Components/UserRoleContext";
import NoAccess from "./Components/Forbiden";

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
        element: (<ProtectedRoute allowedRoles={['admin', 'user']}>
            <Dashboard />
        </ProtectedRoute>)

    },
    {
        path: '/admin',
        element: (<ProtectedRoute allowedRoles={['admin']}>
            <AdminComponent />
        </ProtectedRoute>)

    },
    {
        path: '/noaccess',
        element: (<ProtectedRoute allowedRoles={['admin', 'user', 'guest']}>
            <NoAccess />
        </ProtectedRoute>)

    }
])


const AppLayout = () => {
    return (
        <RolesProvider>
            <div className="app">
                <RouterProvider router={router} />
            </div>
        </RolesProvider>
    )
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
