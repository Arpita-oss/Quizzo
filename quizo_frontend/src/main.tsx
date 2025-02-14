import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./router";
import "./index.css"; // Make sure this points to the correct CSS file

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
