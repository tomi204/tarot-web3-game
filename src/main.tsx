import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ReownContext from "./context/reown.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReownContext>
      <App />
    </ReownContext>
  </StrictMode>
);
