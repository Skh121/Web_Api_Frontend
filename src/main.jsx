import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer, Slide } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./routers/AppRouter.jsx";
import AuthContextProvider from "./auth/AuthProvider.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          theme="dark"
          transition={Slide}
        />
      </QueryClientProvider>
    </AuthContextProvider>
  </StrictMode>
);
