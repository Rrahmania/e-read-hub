import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email dan password harus diisi!");
      return;
    }

    setError("");
    setLoading(true);

    // --- SIMULASI LOGIN (FRONTEND ONLY) ---
    setTimeout(() => {
      // Kita anggap login selalu berhasil jika ada input
      const dummyUser = {
        name: email.split("@")[0], // Ambil nama dari depan email
        email: email,
      };

      // Panggil fungsi login di App.jsx
      onLogin(dummyUser);
      setLoading(false);
      navigate("/");
    }, 1500); // Loading selama 1.5 detik
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>E-Read Hub</h1> {/* Ganti Branding */}
          <p>Masuk ke perpustakaan digital Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="form-input"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="form-input"
              disabled={loading}
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Memproses..." : "Masuk"}
          </button>

          <div className="divider">
            <span>atau masuk dengan</span>
          </div>

          {/* Tombol Sosmed (Hanya Tampilan) */}
          <button
            type="button"
            className="oauth-button google-button"
            onClick={() => alert("Fitur Google Login (Simulasi)")}
          >
            <span className="oauth-icon">G</span> Masuk dengan Google
          </button>

          <div className="form-footer">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="link-button"
            >
              Lupa Password?
            </button>
            <span className="separator">•</span>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="link-button"
            >
              Daftar Akun
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
