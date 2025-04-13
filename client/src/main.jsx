import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Vehicles from "./Vehicles";
import FileUploadPage from "./FileUploadPage"; // Import FileUploadPage
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/upload/:id" element={<FileUploadPage />} /> {/* Add the FileUploadPage route */}
      </Routes>
    </Router>
  </React.StrictMode>
);