import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

export default function TopBar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div style={{
      width: '100%',
      background: '#1e293b',
      color: 'white',
      padding: '12px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontWeight: 'bold',
      fontSize: '1.2rem',
      letterSpacing: '2px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      zIndex: 1000,
      position: 'relative',
      minHeight: 56
    }}>
      <div style={{ marginLeft: 24 }}>VivaAI</div>
      {user && (
        <button
          onClick={handleLogout}
          style={{
            marginRight: 24,
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            padding: '8px 18px',
            fontWeight: 500,
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
}
