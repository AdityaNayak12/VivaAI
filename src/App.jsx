import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import VivaRoom from "./pages/VivaRoom";
import Result from "./pages/Result";
import ProtectedRoute from "./components/ProtectedRoute";
import TopBar from "./components/TopBar";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing has its own nav — no TopBar */}
        <Route path="/" element={<Landing />} />

        {/* Auth pages — no TopBar */}
        <Route path="/login" element={<Login />} />

        {/* App pages — with TopBar */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <TopBar />
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/viva"
          element={
            <ProtectedRoute>
              <TopBar />
              <VivaRoom />
            </ProtectedRoute>
          }
        />

        <Route
          path="/result"
          element={
            <ProtectedRoute>
              <TopBar />
              <Result />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}