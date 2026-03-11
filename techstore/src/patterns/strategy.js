// ============================================================
// DESIGN PATTERN 1: STRATEGY
// Áp dụng cho: Thanh toán & Chiết khấu đơn hàng
// Lợi ích: Tuân thủ Open/Closed — thêm cổng mới không sửa code cũ
// ============================================================

// --- Payment Strategies ---
export class CODPayment {
  pay(amount) {
    return {
      method: "COD",
      message: `Thanh toán ${amount.toLocaleString()}đ khi nhận hàng`,
      icon: "🚚",
    };
  }
}

export class MomoPayment {
  pay(amount) {
    return {
      method: "Momo",
      message: `Đã gửi yêu cầu thanh toán ${amount.toLocaleString()}đ qua Ví MoMo`,
      icon: "💜",
    };
  }
}

export class CreditCardPayment {
  pay(amount) {
    return {
      method: "Credit",
      message: `Thanh toán ${amount.toLocaleString()}đ qua Thẻ tín dụng thành công`,
      icon: "💳",
    };
  }
}

export class VNPayPayment {
  pay(amount) {
    return {
      method: "VNPay",
      message: `Chuyển hướng đến cổng VNPay: ${amount.toLocaleString()}đ`,
      icon: "🏦",
    };
  }
}

// --- Discount Strategies ---
export class RegularDiscount {
  apply(price) {
    return { finalPrice: price, label: "Khách thường", discount: 0 };
  }
}

export class VIPDiscount {
  apply(price) {
    return {
      finalPrice: price * 0.9,
      label: "VIP -10%",
      discount: price * 0.1,
    };
  }
}

// Metadata cho UI
export const PAY_META = {
  cod:    { label: "COD",          icon: "🚚", className: "CODPayment",        color: "#f59e0b", desc: "Trả tiền mặt khi nhận hàng" },
  momo:   { label: "MoMo",         icon: "💜", className: "MomoPayment",       color: "#a855f7", desc: "Ví điện tử MoMo" },
  credit: { label: "Thẻ tín dụng", icon: "💳", className: "CreditCardPayment", color: "#3b82f6", desc: "Visa / Mastercard" },
  vnpay:  { label: "VNPay",        icon: "🏦", className: "VNPayPayment",      color: "#10b981", desc: "Cổng thanh toán VNPay" },
};

export const DISC_META = {
  regular: { label: "Khách thường", icon: "👤", className: "RegularDiscount", color: "#6b7280" },
  vip:     { label: "VIP Member",   icon: "⭐", className: "VIPDiscount",     color: "#f59e0b" },
};
