# ⚡ TechStore — MVP React App

Hệ thống cửa hàng bán lẻ thiết bị công nghệ, xây dựng bằng React thuần với 3 Design Patterns.

## Cấu trúc thư mục

```
src/
├── patterns/
│   ├── strategy.js     # Strategy Pattern — Thanh toán & Chiết khấu
│   ├── factory.js      # Factory Method  — Khởi tạo sản phẩm
│   └── observer.js     # Observer        — Thông báo tồn kho
├── data/
│   ├── products.js     # Dữ liệu sản phẩm (tạo qua Factory)
│   └── users.js        # Tài khoản demo
├── context/
│   └── AppContext.jsx  # Global state, cart reducer, handlers
├── components/
│   └── UI.jsx          # NavBar, ProductCard, Toast, Footer...
├── pages/
│   ├── HomePage.jsx
│   ├── ProductDetailPage.jsx
│   ├── CartPage.jsx
│   ├── CheckoutPage.jsx     ← Strategy Pattern visual
│   ├── AdminPage.jsx        ← Factory + Observer demo
│   └── AuthOrderPages.jsx
└── App.jsx             # Router chính
```

## Design Patterns

| Pattern | File | Áp dụng cho |
|---------|------|-------------|
| **Strategy** | `patterns/strategy.js` | Thanh toán (COD/MoMo/VNPay) & Chiết khấu (VIP) |
| **Factory Method** | `patterns/factory.js` | Tạo sản phẩm theo loại (Laptop/Phone/Mouse...) |
| **Observer** | `patterns/observer.js` | Thông báo khi sản phẩm hết hàng có hàng lại |

## Cài đặt & Chạy

```bash
npm install
npm start
```

## Tài khoản demo

| Role  | Email | Password |
|-------|-------|----------|
| Admin | admin@tech.vn | admin123 |
| User  | user@tech.vn  | user123  |
| VIP   | vip@tech.vn   | vip123   |

## Tech Stack (MVP)
- **Frontend**: React 18, Context API + useReducer
- **Styling**: CSS-in-JS (inline styles)
- **Backend (production)**: Node.js + Express.js
- **Auth (production)**: bcrypt + JWT
- **Database (production)**: Supabase (PostgreSQL)
