import { useState } from "react";
import { useApp } from "../context/AppContext";
import USERS from "../data/users";

// ── Orders Page ───────────────────────────────────────────────
export function OrdersPage() {
  const { orders } = useApp();
  if (orders.length === 0)
    return (
      <div style={{ textAlign: "center", padding: "80px 16px" }}>
        <div style={{ fontSize: 60, marginBottom: 16 }}>📋</div>
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: "#e8e8f0" }}>Chưa có đơn hàng nào</div>
      </div>
    );
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 16px" }}>
      <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 24, color: "#e8e8f0" }}>📋 Đơn hàng của bạn</h2>
      {orders.map((o) => (
        <div key={o.id} style={{ background: "#1a1a2e", borderRadius: 16, padding: 24, marginBottom: 16, border: "1px solid #ffffff10" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontWeight: 800, color: "#e8e8f0" }}>#{o.id}</span>
            <span style={{ fontSize: 12, color: "#00d4ff", background: "#00d4ff15", padding: "4px 10px", borderRadius: 8 }}>{o.status}</span>
          </div>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 10 }}>
            📍 {o.address} · {o.payment.icon} {o.payment.method} · 📅 {o.date}
          </div>
          {o.items.map((i) => (
            <div key={i.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#aaa", marginBottom: 4 }}>
              <span>{i.image} {i.name} x{i.qty}</span>
              <span>{(i.price * i.qty).toLocaleString()}đ</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid #ffffff10", marginTop: 12, paddingTop: 12, display: "flex", justifyContent: "flex-end", fontWeight: 800, fontSize: 16, color: "#00d4ff" }}>
            Tổng: {o.total.toLocaleString()}đ
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Login Page ────────────────────────────────────────────────
export function LoginPage({ setPage }) {
  const { setUser, showToast } = useApp();
  const [email, setEmail] = useState("");
  const [pass,  setPass]  = useState("");

  const handleLogin = () => {
    const u = USERS.find((u) => u.email === email && u.pass === pass);
    if (u) { setUser(u); showToast(`Chào mừng ${u.name}! 👋`); setPage("home"); }
    else showToast("Email hoặc mật khẩu không đúng!", "error");
  };

  const inputStyle = { padding: "10px 14px", borderRadius: 10, border: "1px solid #ffffff20", background: "#ffffff08", color: "#e8e8f0", outline: "none", fontSize: 14, width: "100%", boxSizing: "border-box" };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "calc(100vh - 64px)", padding: 16 }}>
      <div style={{ background: "#1a1a2e", borderRadius: 20, padding: 40, width: "100%", maxWidth: 400, border: "1px solid #00d4ff22" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>⚡</div>
          <h2 style={{ fontSize: 24, fontWeight: 900, margin: 0, color: "#e8e8f0" }}>Đăng nhập TechStore</h2>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 6 }}>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@tech.vn" style={inputStyle} />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 6 }}>Mật khẩu</label>
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="••••••••" style={inputStyle} />
        </div>
        <button onClick={handleLogin} style={{ width: "100%", padding: 14, borderRadius: 12, border: "none", background: "linear-gradient(90deg,#00d4ff,#7b61ff)", color: "#fff", cursor: "pointer", fontWeight: 800, fontSize: 16 }}>
          Đăng nhập →
        </button>
        <div style={{ marginTop: 20, padding: 16, background: "#ffffff06", borderRadius: 12, fontSize: 12, color: "#888", lineHeight: 1.8 }}>
          <div style={{ fontWeight: 700, color: "#aaa", marginBottom: 6 }}>Tài khoản demo:</div>
          <div>👑 Admin: <span style={{ color: "#00d4ff" }}>admin@tech.vn</span> / admin123</div>
          <div>👤 User: <span style={{ color: "#00d4ff" }}>user@tech.vn</span> / user123</div>
          <div>⭐ VIP: <span style={{ color: "#00d4ff" }}>vip@tech.vn</span> / vip123</div>
        </div>
      </div>
    </div>
  );
}
