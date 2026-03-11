import { useApp } from "../context/AppContext";

const S = {
  input: {
    padding: "10px 14px", borderRadius: 10,
    border: "1px solid #ffffff20", background: "#ffffff08",
    color: "#e8e8f0", outline: "none", fontSize: 14,
  },
};
export { S };

// ── NavBtn ────────────────────────────────────────────────────
export function NavBtn({ children, onClick, active }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "7px 14px", borderRadius: 8, cursor: "pointer",
        fontSize: 13, whiteSpace: "nowrap",
        border: active ? "1px solid #00d4ff" : "1px solid #ffffff20",
        background: active ? "#00d4ff15" : "transparent",
        color: active ? "#00d4ff" : "#c0c0d0",
      }}
    >
      {children}
    </button>
  );
}

// ── NavBar ────────────────────────────────────────────────────
export function NavBar({ page, setPage, searchQuery, setSearchQuery }) {
  const { user, setUser, cartCount, showToast } = useApp();
  return (
    <nav style={{
      background: "linear-gradient(135deg,#1a1a2e,#16213e)",
      borderBottom: "1px solid #00d4ff22",
      padding: "0 24px", display: "flex", alignItems: "center",
      gap: 16, height: 64, position: "sticky", top: 0, zIndex: 100,
      boxShadow: "0 2px 20px #00d4ff15",
    }}>
      <div onClick={() => setPage("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8, marginRight: 16 }}>
        <span style={{ fontSize: 24 }}>⚡</span>
        <span style={{ fontSize: 20, fontWeight: 800, background: "linear-gradient(90deg,#00d4ff,#7b61ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>TechStore</span>
      </div>
      <input
        value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="🔍 Tìm kiếm sản phẩm..."
        style={{ flex: 1, maxWidth: 400, padding: "8px 16px", borderRadius: 24, border: "1px solid #00d4ff33", background: "#ffffff10", color: "#e8e8f0", outline: "none", fontSize: 14 }}
      />
      <div style={{ flex: 1 }} />
      {user && <span style={{ fontSize: 13, color: "#00d4ff" }}>👤 {user.name}</span>}
      {user?.role === "admin" && (
        <NavBtn active={page === "admin"} onClick={() => setPage("admin")}>⚙️ Admin</NavBtn>
      )}
      {user && <NavBtn onClick={() => setPage("orders")}>📋 Đơn hàng</NavBtn>}
      <NavBtn active={page === "cart"} onClick={() => setPage("cart")}>
        🛒 Giỏ hàng{" "}
        {cartCount > 0 && (
          <span style={{ background: "#ff4757", borderRadius: 12, padding: "1px 7px", fontSize: 11, marginLeft: 4 }}>{cartCount}</span>
        )}
      </NavBtn>
      {user ? (
        <NavBtn onClick={() => { setUser(null); showToast("Đã đăng xuất!"); setPage("home"); }}>Đăng xuất</NavBtn>
      ) : (
        <NavBtn active={page === "login"} onClick={() => setPage("login")}>Đăng nhập</NavBtn>
      )}
    </nav>
  );
}

// ── Toast ─────────────────────────────────────────────────────
export function Toast() {
  const { toast } = useApp();
  if (!toast) return null;
  return (
    <div style={{
      position: "fixed", top: 80, right: 20, zIndex: 999,
      background: toast.type === "error" ? "#ff475790" : "#00d4ff20",
      border: `1px solid ${toast.type === "error" ? "#ff4757" : "#00d4ff"}`,
      backdropFilter: "blur(10px)", borderRadius: 12,
      padding: "12px 20px", maxWidth: 360, fontSize: 14,
      fontWeight: 600, color: "#fff", boxShadow: "0 8px 32px #00000060",
    }}>
      {toast.msg}
    </div>
  );
}

// ── Section (card wrapper) ────────────────────────────────────
export function Section({ title, children }) {
  return (
    <div style={{ background: "#ffffff06", borderRadius: 14, padding: "18px 20px", border: "1px solid #ffffff10" }}>
      {title && <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: "#ccc" }}>{title}</div>}
      {children}
    </div>
  );
}

// ── Row (label + value) ───────────────────────────────────────
export function Row({ label, value, color }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 14, color: color || "#aaa" }}>
      <span>{label}</span><span>{value}</span>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer style={{ background: "#1a1a2e", borderTop: "1px solid #ffffff10", padding: "32px 24px", textAlign: "center", marginTop: 60, color: "#555", fontSize: 13 }}>
      <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 6, background: "linear-gradient(90deg,#00d4ff,#7b61ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        ⚡ TechStore
      </div>
      <div>Design Patterns: Strategy · Factory Method · Observer</div>
      <div style={{ marginTop: 4 }}>Stack: React · Node.js · Express · Supabase</div>
    </footer>
  );
}

// ── ProductCard ───────────────────────────────────────────────
export function ProductCard({ product, onView, onAddCart, onNotify, watching }) {
  const outOfStock = product.stock === 0;
  return (
    <div
      style={{ background: "linear-gradient(145deg,#1e1e2e,#181828)", border: "1px solid #ffffff10", borderRadius: 16, overflow: "hidden", transition: "all .2s", cursor: "pointer" }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#00d4ff44")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#ffffff10")}
    >
      <div onClick={onView} style={{ padding: "28px 20px 16px", textAlign: "center", background: "#ffffff05" }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>{product.image}</div>
        <div style={{ fontSize: 10, color: "#7b61ff", textTransform: "uppercase", letterSpacing: 2, marginBottom: 4 }}>{product.category}</div>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, lineHeight: 1.3 }}>{product.name}</div>
        <div style={{ fontSize: 12, color: "#666" }}>{product.brand}</div>
      </div>
      <div style={{ padding: "0 20px 20px" }}>
        {Object.entries(product.specs).slice(0, 2).map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#888", marginBottom: 3 }}>
            <span>{k}:</span><span style={{ color: "#aaa" }}>{v}</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, marginBottom: 12 }}>
          <span style={{ fontSize: 18, fontWeight: 800, background: "linear-gradient(90deg,#00d4ff,#7b61ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {product.price.toLocaleString()}đ
          </span>
          <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 8, background: outOfStock ? "#ff475720" : "#00d4ff15", color: outOfStock ? "#ff4757" : "#00d4ff" }}>
            {outOfStock ? "Hết hàng" : `Còn ${product.stock}`}
          </span>
        </div>
        {outOfStock ? (
          <button onClick={onNotify} style={{ width: "100%", padding: "9px", borderRadius: 10, border: "1px solid #7b61ff44", background: "#7b61ff15", color: "#7b61ff", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
            🔔 {watching ? "Đang theo dõi" : "Nhận thông báo"}
          </button>
        ) : (
          <button onClick={onAddCart} style={{ width: "100%", padding: "9px", borderRadius: 10, border: "none", background: "linear-gradient(90deg,#00d4ff,#7b61ff)", color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
            🛒 Thêm vào giỏ
          </button>
        )}
      </div>
    </div>
  );
}
