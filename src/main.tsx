import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import UrlPage from "./pages/url/index.tsx";
import Error404 from "./pages/error/404.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
const basename = "rromsky.tech/it-revolution-24";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter basename={basename}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/url">
          <Route path="*" element={<UrlPage />} />
        </Route>
        <Route path="/admin" element={<UrlPage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <ToastContainer />
    </HashRouter>
  </React.StrictMode>
);
