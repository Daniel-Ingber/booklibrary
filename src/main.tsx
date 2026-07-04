import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeInit } from "../.flowbite-react/init";
import App from "./App.tsx";
import "./index.css";
import Layout from "./layout/Layout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeInit />
    <Layout><App/></Layout>
  </StrictMode>,
);

