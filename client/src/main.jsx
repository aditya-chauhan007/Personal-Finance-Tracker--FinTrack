import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CurrencyProvider } from "./context/CurrencyContext.jsx";
import "./i18n/i18n.js";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(<React.StrictMode><BrowserRouter><AuthProvider><CurrencyProvider><App /><Toaster position="top-right" toastOptions={{ style: { background: "#17142d", color: "white", border: "1px solid rgba(255,255,255,.15)" } }} /></CurrencyProvider></AuthProvider></BrowserRouter></React.StrictMode>);
