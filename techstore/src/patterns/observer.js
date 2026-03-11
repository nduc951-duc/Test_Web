// ============================================================
// DESIGN PATTERN 3: OBSERVER
// Áp dụng cho: Thông báo khi sản phẩm hết hàng có hàng trở lại
// Lợi ích: Loose coupling — Product không cần biết ai đang theo dõi
// ============================================================

export class ProductSubject {
  constructor(product) {
    this.product   = { ...product };
    this.observers = []; // danh sách User đang theo dõi
  }

  // Đăng ký theo dõi
  attach(user) {
    if (!this.observers.find((o) => o.id === user.id)) {
      this.observers.push(user);
    }
  }

  // Huỷ theo dõi
  detach(userId) {
    this.observers = this.observers.filter((o) => o.id !== userId);
  }

  // Gửi thông báo đến tất cả observers
  notify() {
    return this.observers.map((u) => ({
      userId: u.id,
      name: u.name,
      msg: `📦 Sản phẩm "${this.product.name}" đã có hàng trở lại!`,
    }));
  }

  // Cập nhật tồn kho — tự động notify nếu stock > 0
  updateStock(qty, callback) {
    this.product.stock = qty;
    if (qty > 0 && this.observers.length > 0) {
      const notifications = this.notify();
      if (callback) callback(notifications);
    }
  }
}
