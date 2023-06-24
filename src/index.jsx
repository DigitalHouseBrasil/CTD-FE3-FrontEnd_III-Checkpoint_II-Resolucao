import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import App from "./App";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Detail from "./Routes/Detail";
import { ContextProvider } from "./Components/utils/global.context";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dentist/:id" element={<Detail />} />
          </Route>
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
