import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { getDisplayName } from "../utils/getDisplayName";

const navLinks = [
  { label: "Dashboard", path: "/dashboard" },
];

export default function TopBar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      padding: "0 clamp(20px, 4vw, 48px)",
      height: 60,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: "rgba(7, 7, 17, 0.75)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderBottom: "1px solid var(--glass-border)",
    }}>
      {/* Logo */}
      <span
        style={{ fontWeight: 700, fontSize: "1.1rem", letterSpacing: "0.04em", cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        <span className="gradient-text">Viva</span>
        <span style={{ color: "var(--text)" }}>AI</span>
      </span>

      {/* Right side */}
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginRight: 8 }}>
            {getDisplayName(user)}
          </span>
          <button
            onClick={handleLogout}
            className="btn-ghost"
            style={{ padding: "6px 16px", fontSize: "0.85rem" }}
          >
            Log out
          </button>
        </div>
      )}
    </nav>
  );
}
