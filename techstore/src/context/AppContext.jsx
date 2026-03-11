import { createContext, useContext, useReducer, useState } from "react";
import INITIAL_PRODUCTS from "../data/products";
import { ProductSubject } from "../patterns/observer";

// ── Cart Reducer ─────────────────────────────────────────────
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const exist = state.find((i) => i.id === action.product.id);
      if (exist)
        return state.map((i) =>
          i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i
        );
      return [...state, { ...action.product, qty: 1 }];
    }
    case "REMOVE":
      return state.filter((i) => i.id !== action.id);
    case "UPDATE_QTY":
      return state.map((i) =>
        i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i
      );
    case "CLEAR":
      return [];
    default:
      return state;
  }
};

// ── Context ──────────────────────────────────────────────────
const AppContext = createContext();
export const useApp = () => useContext(AppContext);

// ── Provider ─────────────────────────────────────────────────
export function AppProvider({ children }) {
  const [products, setProducts]           = useState(INITIAL_PRODUCTS);
  const [cart, dispatch]                  = useReducer(cartReducer, []);
  const [user, setUser]                   = useState(null);
  const [orders, setOrders]               = useState([]);
  const [toast, setToast]                 = useState(null);
  const [notificationLog, setNotificationLog] = useState([]);
  const [watchList, setWatchList]         = useState({});

  // Observer subjects — một subject per product
  const [productSubjects] = useState(() => {
    const subs = {};
    INITIAL_PRODUCTS.forEach((p) => {
      subs[p.id] = new ProductSubject(p);
    });
    return subs;
  });

  // ── Toast ──
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Cart helpers ──
  const handleAddToCart = (product) => {
    if (product.stock === 0) {
      showToast("Sản phẩm đã hết hàng!", "error");
      return;
    }
    dispatch({ type: "ADD", product });
    showToast(`Đã thêm "${product.name}" vào giỏ hàng 🛒`);
  };

  // ── Observer: đăng ký nhận thông báo ──
  const handleNotifyMe = (product) => {
    if (!user) {
      showToast("Vui lòng đăng nhập để nhận thông báo!", "error");
      return;
    }
    productSubjects[product.id].attach(user);
    setWatchList((w) => ({ ...w, [product.id]: true }));
    showToast(`✅ Bạn sẽ nhận thông báo khi "${product.name}" có hàng!`);
  };

  // ── Observer: admin cập nhật kho → notify ──
  const handleUpdateStock = (productId, qty) => {
    const subj = productSubjects[productId];
    subj.updateStock(qty, (notifications) => {
      setNotificationLog((prev) => [...prev, ...notifications]);
      notifications.forEach((n) => showToast(n.msg));
    });
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: qty } : p))
    );
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <AppContext.Provider
      value={{
        products, setProducts,
        cart, dispatch,
        user, setUser,
        orders, setOrders,
        toast,
        showToast,
        notificationLog,
        watchList,
        productSubjects,
        cartCount,
        cartTotal,
        handleAddToCart,
        handleNotifyMe,
        handleUpdateStock,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
