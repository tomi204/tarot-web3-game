import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ReownContext from "./context/reown.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ReownContext>
        <App />
        <Toaster />
      </ReownContext>
    </AuthProvider>
  </StrictMode>
);
