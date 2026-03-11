import { useState } from "react";
import { useApp } from "../context/AppContext";
import { ProductFactory } from "../patterns/factory";

const inputStyle = { padding: "10px 14px", borderRadius: 10, border: "1px solid #ffffff20", background: "#ffffff08", color: "#e8e8f0", outline: "none", fontSize: 14, width: "100%", boxSizing: "border-box" };

export default function AdminPage() {
  const { products, setProducts, handleUpdateStock, notificationLog, showToast } = useApp();
  const [tab, setTab] = useState("products");
  const [stockInputs, setStockInputs] = useState({});
  const [newProd, setNewProd] = useState({ type: "laptop", name: "", brand: "", price: "", stock: "", RAM: "", CPU: "", GPU: "", Camera: "", Battery: "", Connect: "", Switch: "", DPI: "", Driver: "" });

  const handleAddProduct = () => {
    if (!newProd.name || !newProd.price) { showToast("Nhập tên và giá sản phẩm!", "error"); return; }
    try {
      const product = ProductFactory.createProduct(newProd.type, { ...newProd, id: Date.now(), price: parseInt(newProd.price), stock: parseInt(newProd.stock) || 0 });
      setProducts((prev) => [...prev, product]);
      showToast(`✅ Đã thêm "${product.name}" qua Factory Method!`);
      setNewProd({ type: "laptop", name: "", brand: "", price: "", stock: "", RAM: "", CPU: "", GPU: "", Camera: "", Battery: "", Connect: "", Switch: "", DPI: "", Driver: "" });
    } catch (e) { showToast(e.message, "error"); }
  };

  const TABS = [
    ["products", "📦 Sản phẩm"],
    ["add",      "➕ Thêm (Factory)"],
    ["stock",    "🔧 Kho (Observer)"],
    ["notify",   "🔔 Log thông báo"],
  ];

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 16px" }}>
      <h2 style={{ fontSize: 26, fontWeight: 900, marginBottom: 28, color: "#e8e8f0" }}>⚙️ Admin Dashboard</h2>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }}>
        {[["📦","Tổng sản phẩm",products.length],["❌","Hết hàng",products.filter(p=>p.stock===0).length],["🔔","Thông báo đã gửi",notificationLog.length],["✅","Đang có hàng",products.filter(p=>p.stock>0).length]].map(([icon,label,val]) => (
          <div key={label} style={{ background: "#1a1a2e", borderRadius: 14, padding: "20px 24px", border: "1px solid #ffffff10" }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#00d4ff" }}>{val}</div>
            <div style={{ fontSize: 12, color: "#666" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {TABS.map(([v, label]) => (
          <button key={v} onClick={() => setTab(v)} style={{ padding: "9px 18px", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: tab === v ? 700 : 400, border: tab === v ? "none" : "1px solid #ffffff15", background: tab === v ? "linear-gradient(90deg,#00d4ff,#7b61ff)" : "#ffffff08", color: tab === v ? "#fff" : "#aaa" }}>
            {label}
          </button>
        ))}
      </div>

      {/* Tab: Danh sách */}
      {tab === "products" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {products.map((p) => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 16, background: "#1a1a2e", borderRadius: 12, padding: "14px 20px", border: "1px solid #ffffff10" }}>
              <span style={{ fontSize: 28 }}>{p.image}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: "#e8e8f0" }}>{p.name}</div>
                <div style={{ fontSize: 12, color: "#666" }}>{p.category} · {p.brand}</div>
              </div>
              <div style={{ textAlign: "right", marginRight: 20 }}>
                <div style={{ fontWeight: 700, color: "#00d4ff" }}>{p.price.toLocaleString()}đ</div>
                <div style={{ fontSize: 12, color: p.stock === 0 ? "#ff4757" : "#00d4ff" }}>Tồn: {p.stock}</div>
              </div>
              <button onClick={() => { setProducts((prev) => prev.filter((x) => x.id !== p.id)); showToast("Đã xóa!"); }} style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid #ff475740", background: "#ff475715", color: "#ff4757", cursor: "pointer", fontSize: 13 }}>Xóa</button>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Thêm sản phẩm - Factory */}
      {tab === "add" && (
        <div style={{ background: "#1a1a2e", borderRadius: 16, padding: 28, border: "1px solid #7b61ff33" }}>
          <div style={{ fontSize: 13, color: "#7b61ff", marginBottom: 20, fontWeight: 600, fontFamily: "monospace" }}>
            🏭 ProductFactory.createProduct(type, props) — Factory Method Pattern
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <label style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 6 }}>Loại sản phẩm</label>
              <select value={newProd.type} onChange={(e) => setNewProd((p) => ({ ...p, type: e.target.value }))} style={{ ...inputStyle, cursor: "pointer" }}>
                <option value="laptop">💻 Laptop</option>
                <option value="phone">📱 Điện thoại</option>
                <option value="mouse">🖱️ Chuột</option>
                <option value="keyboard">⌨️ Bàn phím</option>
                <option value="headphone">🎧 Tai nghe</option>
                <option value="accessory">🔌 Phụ kiện</option>
              </select>
            </div>
            {[["name","Tên sản phẩm"],["brand","Thương hiệu"],["price","Giá (VNĐ)"],["stock","Số lượng tồn"]].map(([k, label]) => (
              <div key={k}>
                <label style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 6 }}>{label}</label>
                <input value={newProd[k]} onChange={(e) => setNewProd((p) => ({ ...p, [k]: e.target.value }))} placeholder={label} style={inputStyle} />
              </div>
            ))}
            {newProd.type === "laptop" && [["RAM","RAM"],["CPU","CPU"],["GPU","GPU"]].map(([k, l]) => (
              <div key={k}><label style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 6 }}>{l}</label><input value={newProd[k]} onChange={(e) => setNewProd((p) => ({ ...p, [k]: e.target.value }))} placeholder={l} style={inputStyle} /></div>
            ))}
            {newProd.type === "phone" && [["Camera","Camera"],["Battery","Pin"]].map(([k, l]) => (
              <div key={k}><label style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 6 }}>{l}</label><input value={newProd[k]} onChange={(e) => setNewProd((p) => ({ ...p, [k]: e.target.value }))} placeholder={l} style={inputStyle} /></div>
            ))}
            {newProd.type === "mouse" && [["DPI","DPI"],["Connect","Kết nối"]].map(([k, l]) => (
              <div key={k}><label style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 6 }}>{l}</label><input value={newProd[k]} onChange={(e) => setNewProd((p) => ({ ...p, [k]: e.target.value }))} placeholder={l} style={inputStyle} /></div>
            ))}
            {newProd.type === "keyboard" && [["Switch","Switch"],["Connect","Kết nối"]].map(([k, l]) => (
              <div key={k}><label style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 6 }}>{l}</label><input value={newProd[k]} onChange={(e) => setNewProd((p) => ({ ...p, [k]: e.target.value }))} placeholder={l} style={inputStyle} /></div>
            ))}
            {newProd.type === "headphone" && [["Driver","Driver"],["Connect","Kết nối"]].map(([k, l]) => (
              <div key={k}><label style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 6 }}>{l}</label><input value={newProd[k]} onChange={(e) => setNewProd((p) => ({ ...p, [k]: e.target.value }))} placeholder={l} style={inputStyle} /></div>
            ))}
            {newProd.type === "accessory" && (
              <div><label style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 6 }}>Kết nối</label><input value={newProd.Connect} onChange={(e) => setNewProd((p) => ({ ...p, Connect: e.target.value }))} placeholder="USB / Bluetooth..." style={inputStyle} /></div>
            )}
          </div>
          <button onClick={handleAddProduct} style={{ marginTop: 20, padding: "12px 28px", borderRadius: 12, border: "none", background: "linear-gradient(90deg,#7b61ff,#00d4ff)", color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 15 }}>
            🏭 Tạo sản phẩm qua Factory
          </button>
        </div>
      )}

      {/* Tab: Cập nhật kho - Observer */}
      {tab === "stock" && (
        <div style={{ background: "#1a1a2e", borderRadius: 16, padding: 28, border: "1px solid #00d4ff33" }}>
          <div style={{ fontSize: 13, color: "#00d4ff", marginBottom: 20, fontWeight: 600, fontFamily: "monospace" }}>
            👁️ ProductSubject.updateStock(qty) → tự động notify() Observers
          </div>
          {products.map((p) => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12, padding: "12px 16px", borderRadius: 12, background: "#ffffff06", border: "1px solid #ffffff10" }}>
              <span style={{ fontSize: 24 }}>{p.image}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#e8e8f0" }}>{p.name}</div>
                <div style={{ fontSize: 12, color: p.stock === 0 ? "#ff4757" : "#00d4ff" }}>Hiện tại: {p.stock} {p.stock === 0 ? "❌ Hết hàng" : "✅"}</div>
              </div>
              <input type="number" min="0" placeholder="Số lượng mới" value={stockInputs[p.id] ?? ""} onChange={(e) => setStockInputs((s) => ({ ...s, [p.id]: e.target.value }))} style={{ ...inputStyle, width: 130 }} />
              <button onClick={() => {
                const qty = parseInt(stockInputs[p.id]);
                if (isNaN(qty)) { showToast("Nhập số hợp lệ!", "error"); return; }
                handleUpdateStock(p.id, qty);
                setStockInputs((s) => ({ ...s, [p.id]: "" }));
              }} style={{ padding: "8px 16px", borderRadius: 10, border: "none", background: "linear-gradient(90deg,#00d4ff,#7b61ff)", color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 13, whiteSpace: "nowrap" }}>
                Cập nhật
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Log thông báo */}
      {tab === "notify" && (
        <div style={{ background: "#1a1a2e", borderRadius: 16, padding: 28, border: "1px solid #7b61ff33" }}>
          <div style={{ fontSize: 13, color: "#7b61ff", marginBottom: 16, fontWeight: 600, fontFamily: "monospace" }}>
            🔔 Observer Log — Thông báo đã gửi đến các Observer
          </div>
          {notificationLog.length === 0 ? (
            <div style={{ textAlign: "center", color: "#555", padding: 32 }}>
              Chưa có thông báo nào.<br />
              <span style={{ fontSize: 12 }}>Đăng nhập → Nhận thông báo sản phẩm hết hàng → Admin cập nhật kho → Observer kích hoạt.</span>
            </div>
          ) : (
            notificationLog.map((n, i) => (
              <div key={i} style={{ padding: "12px 16px", borderRadius: 10, background: "#7b61ff10", border: "1px solid #7b61ff30", marginBottom: 8, fontSize: 14 }}>
                <span style={{ color: "#7b61ff", fontWeight: 700 }}>User #{n.userId} ({n.name})</span>: {n.msg}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
