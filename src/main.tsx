import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./global.css";
import ForecastProvider from "./context/forecast-provider.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ForecastProvider>
      <Toaster/>
      <App />
    </ForecastProvider>
  </StrictMode>
);
