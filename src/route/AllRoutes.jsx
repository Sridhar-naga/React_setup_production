import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import MainLayout from "../layout/Mainlayout";
import { RoutesArray } from "./PageRoute";

import { getAuthToken } from "../services/auth";

const PublicRoute = ({ children }) => {
  const token = getAuthToken();
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

const ProtectedRoute = ({ route }) => {
  const token = getAuthToken();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return route.layout ? <MainLayout Element={route.element} /> : route.element;
};

const AllRoutes = () => {
  const location = useLocation();
  const token = getAuthToken();

  return (
    <Routes>
      {RoutesArray.map((route, index) => {
        // Public routes (Login / Register)
        if (!route.layout) {
          return (
            <Route
              key={route.path || index}
              path={route.path}
              element={
                route.path === "/login" ? (
                  <PublicRoute>{route.element}</PublicRoute>
                ) : (
                  route.element
                )
              }
            />
          );
        }

        // Protected routes with layout
        return (
          <Route
            key={route.path || index}
            path={route.path}
            element={<ProtectedRoute route={route} />}
          />
        );
      })}

      <Route
        path="*"
        element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
};

export default AllRoutes;