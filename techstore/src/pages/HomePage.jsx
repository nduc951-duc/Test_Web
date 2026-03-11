import { useApp } from "../context/AppContext";
import { ProductCard } from "../components/UI";

const CATEGORIES = ["Tất cả","Laptop","Điện thoại","Chuột","Bàn phím","Tai nghe","Phụ kiện"];

export default function HomePage({ setPage, setSelectedProduct, searchQuery, filterCategory, setFilterCategory }) {
  const { products, handleAddToCart, handleNotifyMe, watchList } = useApp();

  const filtered = products.filter((p) => {
    const matchCat    = filterCategory === "Tất cả" || p.category === filterCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 16px" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg,#1a1a2e,#0d2137)", borderRadius: 20, padding: "40px 48px", marginBottom: 40, border: "1px solid #00d4ff22", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: 40, top: "50%", transform: "translateY(-50%)", fontSize: 100, opacity: 0.15 }}>⚡</div>
        <div style={{ fontSize: 13, color: "#00d4ff", letterSpacing: 3, marginBottom: 8, textTransform: "uppercase" }}>Welcome to TechStore</div>
        <h1 style={{ fontSize: 40, fontWeight: 900, margin: "0 0 12px", lineHeight: 1.2, color: "#e8e8f0" }}>
          Thiết bị công nghệ<br />
          <span style={{ background: "linear-gradient(90deg,#00d4ff,#7b61ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>đỉnh cao nhất</span>
        </h1>
        <p style={{ color: "#8888aa", margin: "0 0 24px" }}>Laptop, điện thoại, phụ kiện chính hãng. Giao hàng toàn quốc.</p>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {[["🚀","Giao hàng nhanh"],["🛡️","Bảo hành chính hãng"],["💳","Trả góp 0%"]].map(([icon, text]) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#aaaacc" }}>
              <span>{icon}</span>{text}
            </div>
          ))}
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setFilterCategory(c)} style={{ padding: "8px 20px", borderRadius: 24, cursor: "pointer", fontSize: 13, fontWeight: filterCategory === c ? 700 : 400, border: filterCategory === c ? "none" : "1px solid #ffffff20", background: filterCategory === c ? "linear-gradient(90deg,#00d4ff,#7b61ff)" : "#ffffff08", color: filterCategory === c ? "#fff" : "#aaa" }}>
            {c}
          </button>
        ))}
        <span style={{ marginLeft: "auto", color: "#666", fontSize: 13, alignSelf: "center" }}>{filtered.length} sản phẩm</span>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 20 }}>
        {filtered.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            watching={watchList[p.id]}
            onView={() => { setSelectedProduct(p); setPage("product"); }}
            onAddCart={() => handleAddToCart(p)}
            onNotify={() => handleNotifyMe(p)}
          />
        ))}
      </div>
      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: 60, color: "#555" }}>Không tìm thấy sản phẩm nào 😢</div>
      )}
    </div>
  );
}
