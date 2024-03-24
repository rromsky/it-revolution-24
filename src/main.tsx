import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import UrlPage from "./pages/url/index.tsx";
import Error404 from "./pages/error/404.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/url">
          <Route path="*" element={<UrlPage />} />
        </Route>
        <Route path="/admin" element={<UrlPage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
