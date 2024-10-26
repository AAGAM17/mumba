import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"
import { ClerkProvider } from "@clerk/clerk-react"
import { BrowserRouter as Router } from "react-router-dom"

const{VITE_CLERK_PUBLISHABLE_KEY} = import.meta.env
const publishableKey = VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <ClerkProvider publishableKey={publishableKey}>
    <Router>
        <App />
        </Router>
  </ClerkProvider>
  </React.StrictMode>
);

