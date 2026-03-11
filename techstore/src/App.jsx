import { useState } from "react";
import { AppProvider } from "./context/AppContext";
import { NavBar, Toast, Footer } from "./components/UI";
import HomePage          from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage          from "./pages/CartPage";
import CheckoutPage      from "./pages/CheckoutPage";
import AdminPage         from "./pages/AdminPage";
import { OrdersPage, LoginPage } from "./pages/AuthOrderPages";

export default function App() {
  const [page,            setPage]            = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery,     setSearchQuery]     = useState("");
  const [filterCategory,  setFilterCategory]  = useState("Tất cả");

  return (
    <AppProvider>
      <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", minHeight: "100vh", background: "#0f0f13", color: "#e8e8f0" }}>
        <NavBar
          page={page} setPage={setPage}
          searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        />
        <Toast />

        {page === "home" && (
          <HomePage
            setPage={setPage}
            setSelectedProduct={setSelectedProduct}
            searchQuery={searchQuery}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
          />
        )}
        {page === "product" && selectedProduct && (
          <ProductDetailPage product={selectedProduct} setPage={setPage} />
        )}
        {page === "cart"     && <CartPage     setPage={setPage} />}
        {page === "checkout" && <CheckoutPage setPage={setPage} />}
        {page === "admin"    && <AdminPage />}
        {page === "orders"   && <OrdersPage />}
        {page === "login"    && <LoginPage setPage={setPage} />}

        {page === "home" && <Footer />}
      </div>
    </AppProvider>
  );
}
