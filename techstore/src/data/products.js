import { ProductFactory } from "../patterns/factory";

// Tất cả sản phẩm khởi tạo qua ProductFactory (Factory Method Pattern)
const INITIAL_PRODUCTS = [
  // ── LAPTOP (3) ──────────────────────────────────────────────
  ProductFactory.createProduct("laptop", { id: 1,  name: "Acer Aspire 7 Gaming",        brand: "Acer",    price: 18990000, RAM: "16GB DDR4",    CPU: "AMD Ryzen 5 5500H",  GPU: "NVIDIA GTX 1650", stock: 5 }),
  ProductFactory.createProduct("laptop", { id: 2,  name: 'MacBook Air M2 13"',           brand: "Apple",   price: 27990000, RAM: "8GB Unified",  CPU: "Apple M2",           GPU: "M2 8-core GPU",   stock: 3 }),
  ProductFactory.createProduct("laptop", { id: 3,  name: "Dell XPS 15 OLED",             brand: "Dell",    price: 35990000, RAM: "32GB DDR5",    CPU: "Intel i7-13700H",    GPU: "RTX 4060",        stock: 2 }),

  // ── ĐIỆN THOẠI (3) ──────────────────────────────────────────
  ProductFactory.createProduct("phone",  { id: 4,  name: "iPhone 15 Pro Max 256GB",      brand: "Apple",   price: 34990000, Camera: "48MP Triple",  Battery: "4422 mAh", stock: 0 }),
  ProductFactory.createProduct("phone",  { id: 5,  name: "Samsung Galaxy S24 Ultra",     brand: "Samsung", price: 22990000, Camera: "200MP Quad",   Battery: "5000 mAh", stock: 8 }),
  ProductFactory.createProduct("phone",  { id: 6,  name: "Xiaomi 14 Ultra",              brand: "Xiaomi",  price: 19990000, Camera: "50MP Leica",   Battery: "5000 mAh", stock: 4 }),

  // ── CHUỘT (5) ───────────────────────────────────────────────
  ProductFactory.createProduct("mouse",  { id: 10, name: "Logitech G502 X Plus",         brand: "Logitech",    price: 1990000, DPI: "100–25600 DPI", Connect: "Wireless 2.4GHz",  stock: 15 }),
  ProductFactory.createProduct("mouse",  { id: 11, name: "Razer DeathAdder V3 Pro",      brand: "Razer",       price: 2490000, DPI: "30–30000 DPI",  Connect: "Wireless / USB",   stock: 10 }),
  ProductFactory.createProduct("mouse",  { id: 12, name: "SteelSeries Rival 650",        brand: "SteelSeries", price: 1690000, DPI: "100–12000 DPI", Connect: "Wireless",         stock: 7  }),
  ProductFactory.createProduct("mouse",  { id: 13, name: "Corsair Dark Core RGB Pro",    brand: "Corsair",     price: 1490000, DPI: "50–18000 DPI",  Connect: "Bluetooth / USB",  stock: 0  }),
  ProductFactory.createProduct("mouse",  { id: 14, name: "Logitech MX Master 3S",        brand: "Logitech",    price: 2190000, DPI: "200–8000 DPI",  Connect: "Bluetooth",        stock: 12 }),

  // ── BÀN PHÍM (5) ────────────────────────────────────────────
  ProductFactory.createProduct("keyboard", { id: 20, name: "Keychron Q3 Pro QMK",        brand: "Keychron", price: 3490000, Switch: "Gateron G Pro Red", Connect: "Bluetooth / USB-C", stock: 8 }),
  ProductFactory.createProduct("keyboard", { id: 21, name: "Logitech G915 TKL",          brand: "Logitech", price: 4290000, Switch: "GL Linear",         Connect: "Wireless 2.4GHz",   stock: 5 }),
  ProductFactory.createProduct("keyboard", { id: 22, name: "Razer BlackWidow V4 Pro",    brand: "Razer",    price: 3890000, Switch: "Razer Yellow",       Connect: "Wireless / USB",    stock: 6 }),
  ProductFactory.createProduct("keyboard", { id: 23, name: "Royal Kludge RK84 Pro",      brand: "RK",       price: 1290000, Switch: "RK Brown",           Connect: "Bluetooth 5.0",     stock: 0 }),
  ProductFactory.createProduct("keyboard", { id: 24, name: "Corsair K100 RGB Air",       brand: "Corsair",  price: 5490000, Switch: "Cherry MX Speed",    Connect: "Wireless / USB-C",  stock: 3 }),

  // ── TAI NGHE (5) ────────────────────────────────────────────
  ProductFactory.createProduct("headphone", { id: 30, name: "Sony WH-1000XM5",           brand: "Sony",       price: 7490000, Driver: "30mm",    Connect: "Bluetooth 5.2",   stock: 0 }),
  ProductFactory.createProduct("headphone", { id: 31, name: "Apple AirPods Pro 2 USB-C", brand: "Apple",      price: 6290000, Driver: "H2 chip", Connect: "Bluetooth 5.3",   stock: 9 }),
  ProductFactory.createProduct("headphone", { id: 32, name: "Bose QuietComfort 45",      brand: "Bose",       price: 6890000, Driver: "40mm",    Connect: "Bluetooth 5.1",   stock: 4 }),
  ProductFactory.createProduct("headphone", { id: 33, name: "Sennheiser Momentum 4",     brand: "Sennheiser", price: 7990000, Driver: "42mm",    Connect: "Bluetooth 5.2",   stock: 2 }),
  ProductFactory.createProduct("headphone", { id: 34, name: "SteelSeries Arctis Nova 7", brand: "SteelSeries",price: 3490000, Driver: "40mm",    Connect: "Wireless 2.4GHz", stock: 0 }),

  // ── PHỤ KIỆN (2) ────────────────────────────────────────────
  ProductFactory.createProduct("accessory", { id: 40, name: 'Màn hình Samsung Odyssey G5 27"', brand: "Samsung", price: 7990000, image: "🖥️", Connect: "HDMI 2.0 / DP", stock: 6 }),
  ProductFactory.createProduct("accessory", { id: 41, name: "Hub USB-C Anker 7-in-1",          brand: "Anker",    price: 890000,  image: "🔌", Connect: "USB-C",          stock: 25 }),
];

export default INITIAL_PRODUCTS;
