import React from "react";
import { Navigate } from "react-router-dom";

// Auth & Common
import Login from "../pages/auth/Login";
import UnauthorizedAccess from "../pages/others/UnauthorizedAccess";


import Dashboard from "../pages/dashboard/Dashboard";
// import Admin from "../pages/admin/Admin";
// import AdminForm from "../pages/admin/AdminForm";
// import AdminView from "../pages/admin/AdminView";

export const RoutesArray = [
  // ─── Public ─────────────────────────────────────────────────────────────────
  { path: "/login", element: <Login />, layout: false, name: "Staff Login" },
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
    layout: false,
    name: "Home",
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedAccess />,
    layout: true,
    name: "Restricted Access",
  },

  // ─── Clinical Modules ────────────────────────────────────────────────────────
  { path: "/dashboard", element: <Dashboard />, layout: true, name: "Hospital Dashboard" },
  { path: "/doctors", element: <Dashboard />, layout: true, name: "Doctors & Medical Staff" },
  { path: "/patients", element: <Dashboard />, layout: true, name: "Patients Directory & EHR" },
  { path: "/appointments", element: <Dashboard />, layout: true, name: "Appointments & OPD" },
  { path: "/wards", element: <Dashboard />, layout: true, name: "Wards & Bed Allocations" },
  { path: "/emergency", element: <Dashboard />, layout: true, name: "Emergency & ICU" },
  { path: "/billing", element: <Dashboard />, layout: true, name: "Billing & Insurance" },
  { path: "/settings", element: <Dashboard />, layout: true, name: "Hospital Settings" },
  { path: "/profile", element: <Dashboard />, layout: true, name: "Doctor Profile" },

  { path: "/admin/dashboard", element: <Navigate to="/dashboard" replace />, layout: false },
];