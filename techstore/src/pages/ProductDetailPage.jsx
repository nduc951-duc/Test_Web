import { useApp } from "../context/AppContext";

export default function ProductDetailPage({ product, setPage }) {
  const { handleAddToCart, handleNotifyMe, watchList, products } = useApp();
  // Lấy stock mới nhất từ store
  const current    = products.find((p) => p.id === product.id) || product;
  const outOfStock = current.stock === 0;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 16px" }}>
      <button onClick={() => setPage("home")} style={{ marginBottom: 24, background: "none", border: "1px solid #ffffff20", color: "#aaa", padding: "8px 16px", borderRadius: 8, cursor: "pointer" }}>
        ← Quay lại
      </button>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, background: "#1a1a2e", borderRadius: 20, padding: 40, border: "1px solid #00d4ff22" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 120, background: "#ffffff05", borderRadius: 16, minHeight: 240 }}>
          {current.image}
        </div>
        <div>
          <div style={{ fontSize: 11, color: "#7b61ff", textTransform: "uppercase", letterSpacing: 3, marginBottom: 8 }}>
            {current.category} · {current.brand}
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 900, margin: "0 0 16px", color: "#e8e8f0" }}>{current.name}</h1>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
            {Object.entries(current.specs).map(([k, v]) => (
              <div key={k} style={{ background: "#ffffff06", borderRadius: 10, padding: "10px 14px", border: "1px solid #ffffff10" }}>
                <div style={{ fontSize: 10, color: "#666", marginBottom: 3, textTransform: "uppercase", letterSpacing: 1 }}>{k}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#e8e8f0" }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 32, fontWeight: 900, background: "linear-gradient(90deg,#00d4ff,#7b61ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 8 }}>
            {current.price.toLocaleString()}đ
          </div>
          <div style={{ fontSize: 13, color: outOfStock ? "#ff4757" : "#00d4ff", marginBottom: 24 }}>
            {outOfStock ? "❌ Hết hàng" : `✅ Còn ${current.stock} sản phẩm`}
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {outOfStock ? (
              <button onClick={() => handleNotifyMe(current)} style={{ flex: 1, padding: "13px", borderRadius: 12, border: "1px solid #7b61ff", background: "#7b61ff15", color: "#7b61ff", cursor: "pointer", fontWeight: 700, fontSize: 15 }}>
                🔔 {watchList[current.id] ? "Đang theo dõi" : "Nhận thông báo khi có hàng"}
              </button>
            ) : (
              <>
                <button onClick={() => handleAddToCart(current)} style={{ flex: 1, padding: "13px", borderRadius: 12, border: "none", background: "linear-gradient(90deg,#00d4ff,#7b61ff)", color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 15 }}>
                  🛒 Thêm vào giỏ
                </button>
                <button onClick={() => { handleAddToCart(current); setPage("cart"); }} style={{ padding: "13px 20px", borderRadius: 12, border: "1px solid #00d4ff44", background: "#00d4ff15", color: "#00d4ff", cursor: "pointer", fontWeight: 700, fontSize: 15 }}>
                  Mua ngay
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
