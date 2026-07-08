import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeInit } from "../.flowbite-react/init";
import "./index.css";
import Layout from "./layout/Layout.tsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastContainer position="top-center"/>
    <ThemeInit />
    <Layout/>
  </StrictMode>,
);

