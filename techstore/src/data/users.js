// Tài khoản demo (production thay bằng API + JWT)
const USERS = [
  { id: 1, name: "Admin",        email: "admin@tech.vn", pass: "admin123", role: "admin"    },
  { id: 2, name: "Nguyễn Văn A", email: "user@tech.vn",  pass: "user123",  role: "customer" },
  { id: 3, name: "VIP Member",   email: "vip@tech.vn",   pass: "vip123",   role: "customer", vip: true },
];

export default USERS;
