// ============================================================
// DESIGN PATTERN 2: FACTORY METHOD
// Áp dụng cho: Khởi tạo sản phẩm theo loại (Laptop/Phone/Mouse...)
// Lợi ích: Gom logic khởi tạo vào một nơi, dễ thêm loại mới
// ============================================================

class Laptop {
  constructor(p) {
    this.id       = p.id;
    this.type     = "laptop";
    this.category = "Laptop";
    this.name     = p.name;
    this.brand    = p.brand;
    this.price    = p.price;
    this.stock    = p.stock;
    this.image    = p.image || "💻";
    this.specs    = { RAM: p.RAM, CPU: p.CPU, GPU: p.GPU };
  }
}

class Phone {
  constructor(p) {
    this.id       = p.id;
    this.type     = "phone";
    this.category = "Điện thoại";
    this.name     = p.name;
    this.brand    = p.brand;
    this.price    = p.price;
    this.stock    = p.stock;
    this.image    = p.image || "📱";
    this.specs    = { Camera: p.Camera, Battery: p.Battery };
  }
}

class Mouse {
  constructor(p) {
    this.id       = p.id;
    this.type     = "mouse";
    this.category = "Chuột";
    this.name     = p.name;
    this.brand    = p.brand;
    this.price    = p.price;
    this.stock    = p.stock;
    this.image    = "🖱️";
    this.specs    = { DPI: p.DPI, Connect: p.Connect };
  }
}

class Keyboard {
  constructor(p) {
    this.id       = p.id;
    this.type     = "keyboard";
    this.category = "Bàn phím";
    this.name     = p.name;
    this.brand    = p.brand;
    this.price    = p.price;
    this.stock    = p.stock;
    this.image    = "⌨️";
    this.specs    = { Switch: p.Switch, Connect: p.Connect };
  }
}

class Headphone {
  constructor(p) {
    this.id       = p.id;
    this.type     = "headphone";
    this.category = "Tai nghe";
    this.name     = p.name;
    this.brand    = p.brand;
    this.price    = p.price;
    this.stock    = p.stock;
    this.image    = "🎧";
    this.specs    = { Driver: p.Driver, Connect: p.Connect };
  }
}

class Accessory {
  constructor(p) {
    this.id       = p.id;
    this.type     = "accessory";
    this.category = "Phụ kiện";
    this.name     = p.name;
    this.brand    = p.brand;
    this.price    = p.price;
    this.stock    = p.stock;
    this.image    = p.image || "🔌";
    this.specs    = { Connect: p.Connect };
  }
}

// ---- Factory ----
export class ProductFactory {
  static createProduct(type, props) {
    switch (type) {
      case "laptop":    return new Laptop(props);
      case "phone":     return new Phone(props);
      case "mouse":     return new Mouse(props);
      case "keyboard":  return new Keyboard(props);
      case "headphone": return new Headphone(props);
      case "accessory": return new Accessory(props);
      default: throw new Error(`ProductFactory: unknown type "${type}"`);
    }
  }
}
