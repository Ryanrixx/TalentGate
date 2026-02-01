import React from "react";



import ReactDOM from "react-dom/client";
import "./styles/globals.css";
import { App } from "./app/App";
import { AuthProvider } from "./store/auth.store";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);
