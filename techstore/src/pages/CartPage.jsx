import { useApp } from "../context/AppContext";
import { Row } from "../components/UI";

export default function CartPage({ setPage }) {
  const { cart, dispatch, cartTotal, user } = useApp();

  const handleCheckout = () => setPage(user ? "checkout" : "login");

  if (cart.length === 0)
    return (
      <div style={{ textAlign: "center", padding: "80px 16px" }}>
        <div style={{ fontSize: 60, marginBottom: 16 }}>🛒</div>
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: "#e8e8f0" }}>Giỏ hàng trống</div>
        <div style={{ color: "#666", marginBottom: 24 }}>Hãy thêm sản phẩm vào giỏ hàng!</div>
        <button onClick={() => setPage("home")} style={{ padding: "12px 28px", borderRadius: 12, border: "none", background: "linear-gradient(90deg,#00d4ff,#7b61ff)", color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 15 }}>
          Tiếp tục mua sắm
        </button>
      </div>
    );

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 16px" }}>
      <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 24, color: "#e8e8f0" }}>🛒 Giỏ hàng</h2>

      {!user && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#ff475712", border: "1px solid #ff475744", borderRadius: 12, padding: "12px 20px", marginBottom: 20 }}>
          <span style={{ fontSize: 14, color: "#ff8a95" }}>⚠️ Bạn chưa đăng nhập. Đăng nhập để tiến hành thanh toán.</span>
          <button onClick={() => setPage("login")} style={{ padding: "7px 16px", borderRadius: 8, border: "none", background: "#ff4757", color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 13, whiteSpace: "nowrap", marginLeft: 12 }}>
            Đăng nhập ngay
          </button>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {cart.map((item) => (
            <div key={item.id} style={{ display: "flex", gap: 16, alignItems: "center", background: "#1a1a2e", borderRadius: 14, padding: "16px 20px", border: "1px solid #ffffff10" }}>
              <div style={{ fontSize: 36 }}>{item.image}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, marginBottom: 2, color: "#e8e8f0" }}>{item.name}</div>
                <div style={{ fontSize: 12, color: "#666" }}>{item.brand} · {item.category}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#00d4ff", marginTop: 4 }}>{item.price.toLocaleString()}đ</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button onClick={() => dispatch({ type: "UPDATE_QTY", id: item.id, qty: item.qty - 1 })} style={{ width: 28, height: 28, borderRadius: 8, border: "1px solid #ffffff20", background: "none", color: "#aaa", cursor: "pointer", fontSize: 16 }}>−</button>
                <span style={{ width: 24, textAlign: "center", fontWeight: 700, color: "#e8e8f0" }}>{item.qty}</span>
                <button onClick={() => dispatch({ type: "UPDATE_QTY", id: item.id, qty: item.qty + 1 })} style={{ width: 28, height: 28, borderRadius: 8, border: "1px solid #ffffff20", background: "none", color: "#aaa", cursor: "pointer", fontSize: 16 }}>+</button>
              </div>
              <div style={{ fontWeight: 800, width: 120, textAlign: "right", color: "#7b61ff" }}>{(item.price * item.qty).toLocaleString()}đ</div>
              <button onClick={() => dispatch({ type: "REMOVE", id: item.id })} style={{ background: "none", border: "none", color: "#ff4757", cursor: "pointer", fontSize: 18 }}>✕</button>
            </div>
          ))}
        </div>

        <div style={{ background: "#1a1a2e", borderRadius: 16, padding: 24, border: "1px solid #00d4ff22", height: "fit-content" }}>
          <h3 style={{ margin: "0 0 16px", fontWeight: 800, color: "#e8e8f0" }}>Tóm tắt đơn hàng</h3>
          <Row label="Tạm tính"      value={`${cartTotal.toLocaleString()}đ`} />
          <Row label="Phí giao hàng" value="Miễn phí" color="#00d4ff" />
          <Row label="VAT (10%)"     value={`${(cartTotal * 0.1).toLocaleString()}đ`} />
          <div style={{ borderTop: "1px solid #ffffff15", margin: "16px 0", paddingTop: 16, display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 18 }}>
            <span style={{ color: "#e8e8f0" }}>Tổng cộng</span>
            <span style={{ background: "linear-gradient(90deg,#00d4ff,#7b61ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {(cartTotal * 1.1).toLocaleString()}đ
            </span>
          </div>
          <button onClick={handleCheckout} style={{ width: "100%", padding: 14, borderRadius: 12, border: "none", background: "linear-gradient(90deg,#00d4ff,#7b61ff)", color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 16, marginTop: 8 }}>
            {user ? "Tiến hành thanh toán →" : "🔐 Đăng nhập để thanh toán"}
          </button>
        </div>
      </div>
    </div>
  );
}
