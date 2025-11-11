// main.jsx
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"

const basename = import.meta.env.BASE_URL ?? "/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>
);
