import { useState, useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import { Section, Row } from "../components/UI";
import {
  CODPayment, MomoPayment, CreditCardPayment, VNPayPayment,
  RegularDiscount, VIPDiscount,
  PAY_META, DISC_META,
} from "../patterns/strategy";

const inputStyle = { padding: "10px 14px", borderRadius: 10, border: "1px solid #ffffff20", background: "#ffffff08", color: "#e8e8f0", outline: "none", fontSize: 14, width: "100%", boxSizing: "border-box" };

// ============================================================
// MOMO POPUP
// ============================================================
function MomoPopup({ amount, orderId, onSuccess, onCancel }) {
  const [screen,    setScreen]    = useState("qr");
  const [otp,       setOtp]       = useState(["","","","","",""]);
  const [otpError,  setOtpError]  = useState(false);
  const [countdown, setCountdown] = useState(300);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (screen !== "qr" || countdown === 0) return;
    const t = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(t);
  }, [screen, countdown]);

  const mins = String(Math.floor(countdown / 60)).padStart(2, "0");
  const secs = String(countdown % 60).padStart(2, "0");

  const handleOtpChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp]; next[i] = val;
    setOtp(next); setOtpError(false);
    if (val && i < 5) inputRefs.current[i + 1]?.focus();
  };
  const handleOtpKeyDown = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) inputRefs.current[i - 1]?.focus();
  };
  const handleConfirmOtp = () => {
    if (otp.join("") === "000000") {
      setScreen("processing");
      setTimeout(() => { setScreen("done"); setTimeout(onSuccess, 1000); }, 2000);
    } else {
      setOtpError(true);
      setOtp(["","","","","",""]);
      inputRefs.current[0]?.focus();
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "#00000099", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}
      onClick={e => { if (e.target === e.currentTarget) onCancel(); }}>
      <div style={{ background: "#fff", borderRadius: 24, width: 360, overflow: "hidden", boxShadow: "0 32px 80px #00000080", fontFamily: "'Segoe UI', sans-serif", animation: "momoIn .25s ease" }}>
        <style>{`
          @keyframes momoIn { from{transform:scale(.92) translateY(16px);opacity:0} to{transform:scale(1) translateY(0);opacity:1} }
          @keyframes spin { to{transform:rotate(360deg)} }
          @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.35} }
          @keyframes pop { 0%{transform:scale(0)} 60%{transform:scale(1.2)} 100%{transform:scale(1)} }
        `}</style>

        {/* Header */}
        <div style={{ background: "linear-gradient(135deg,#ae2070,#d82d8b)", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ background: "#fff", borderRadius: 12, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>💜</div>
            <div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 17, letterSpacing: 0.5 }}>MoMo</div>
              <div style={{ color: "#ffcce8", fontSize: 11 }}>Ví điện tử MoMo</div>
            </div>
          </div>
          <button onClick={onCancel} style={{ background: "#ffffff25", border: "none", color: "#fff", borderRadius: 10, width: 32, height: 32, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>

        {/* QR Screen */}
        {screen === "qr" && (
          <div style={{ padding: "20px 24px 24px" }}>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "#999", marginBottom: 4 }}>Số tiền thanh toán</div>
              <div style={{ fontSize: 30, fontWeight: 900, color: "#ae2070" }}>{amount.toLocaleString("vi-VN")}đ</div>
              <div style={{ fontSize: 11, color: "#bbb", marginTop: 2 }}>Mã đơn: <span style={{ color: "#ae2070", fontWeight: 600 }}>{orderId}</span></div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
              <div style={{ 
                background: "#fff", 
                border: "3px solid #ae2070", 
                borderRadius: 16, 
                padding: 12, 
                boxShadow: "0 4px 20px #ae207025",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <img 
                  src={`https://img.vietqr.io/image/momo-0923597174-compact.png?amount=${amount}&addInfo=${orderId}`} 
                  alt="MoMo QR Code"
                  style={{ width: 160, height: 160, borderRadius: 8 }}
                />
              </div>
            </div>

            <div style={{ textAlign: "center", marginBottom: 14 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: countdown < 60 ? "#ff475710" : "#ae207010", border: `1px solid ${countdown < 60 ? "#ff4757" : "#ae207044"}`, borderRadius: 20, padding: "4px 14px", fontSize: 13, color: countdown < 60 ? "#ff4757" : "#ae2070", fontWeight: 700 }}>
                ⏱ Hết hạn sau {mins}:{secs}
              </span>
            </div>

            <div style={{ background: "#fdf0f6", borderRadius: 12, padding: "12px 16px", marginBottom: 16, fontSize: 12, color: "#888", lineHeight: 1.8 }}>
              <div style={{ fontWeight: 700, color: "#ae2070", marginBottom: 2 }}>📱 Hướng dẫn quét QR:</div>
              <div>1. Mở app <b>MoMo</b> trên điện thoại</div>
              <div>2. Chọn <b>Quét mã QR</b></div>
              <div>3. Quét mã bên trên để thanh toán</div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={onCancel} style={{ flex: 1, padding: 11, borderRadius: 12, border: "1px solid #e0e0e0", background: "#fff", color: "#888", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>Huỷ</button>
              <button onClick={() => setScreen("otp")} style={{ flex: 2, padding: 11, borderRadius: 12, border: "none", background: "linear-gradient(135deg,#ae2070,#d82d8b)", color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
                💜 Nhập OTP thay thế
              </button>
            </div>
          </div>
        )}

        {/* OTP Screen */}
        {screen === "otp" && (
          <div style={{ padding: "20px 24px 24px" }}>
            <button onClick={() => setScreen("qr")} style={{ background: "none", border: "none", color: "#ae2070", cursor: "pointer", fontSize: 13, fontWeight: 600, marginBottom: 12, padding: 0 }}>← Quay lại</button>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 38, marginBottom: 8 }}>🔐</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: "#1a0a2e", marginBottom: 4 }}>Xác nhận thanh toán</div>
              <div style={{ fontSize: 13, color: "#888", lineHeight: 1.5 }}>Nhập mã OTP 6 số<br/>được gửi đến SĐT của bạn</div>
              <div style={{ marginTop: 8, display: "inline-block", background: "#ae207012", border: "1px solid #ae207030", borderRadius: 8, padding: "4px 12px", fontSize: 12, color: "#ae2070" }}>
                Demo: nhập <b>000000</b>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 16 }}>
              {otp.map((v, i) => (
                <input key={i} ref={el => inputRefs.current[i] = el}
                  value={v} onChange={e => handleOtpChange(i, e.target.value)}
                  onKeyDown={e => handleOtpKeyDown(i, e)}
                  maxLength={1} inputMode="numeric"
                  style={{ width: 44, height: 52, textAlign: "center", fontSize: 22, fontWeight: 800, borderRadius: 12, outline: "none", transition: "all .15s", border: otpError ? "2px solid #ff4757" : v ? "2px solid #ae2070" : "2px solid #e0e0e0", background: v ? "#ae207010" : "#f9f9f9", color: "#1a0a2e" }} />
              ))}
            </div>

            {otpError && <div style={{ textAlign: "center", color: "#ff4757", fontSize: 13, marginBottom: 10, fontWeight: 600 }}>❌ OTP không đúng, vui lòng thử lại!</div>}

            <div style={{ textAlign: "center", marginBottom: 16, fontSize: 13, color: "#aaa" }}>
              Số tiền: <span style={{ fontWeight: 800, color: "#ae2070" }}>{amount.toLocaleString("vi-VN")}đ</span>
            </div>

            <button onClick={handleConfirmOtp} disabled={otp.join("").length < 6}
              style={{ width: "100%", padding: 14, borderRadius: 12, border: "none", background: otp.join("").length === 6 ? "linear-gradient(135deg,#ae2070,#d82d8b)" : "#e0e0e0", color: otp.join("").length === 6 ? "#fff" : "#aaa", cursor: otp.join("").length === 6 ? "pointer" : "not-allowed", fontWeight: 800, fontSize: 15, transition: "all .2s" }}>
              Xác nhận thanh toán
            </button>
          </div>
        )}

        {/* Processing Screen */}
        {screen === "processing" && (
          <div style={{ padding: "52px 24px", textAlign: "center" }}>
            <div style={{ width: 60, height: 60, borderRadius: "50%", border: "4px solid #ae207025", borderTopColor: "#ae2070", margin: "0 auto 20px", animation: "spin 1s linear infinite" }} />
            <div style={{ fontSize: 16, fontWeight: 700, color: "#1a0a2e", marginBottom: 6 }}>Đang xử lý thanh toán...</div>
            <div style={{ fontSize: 13, color: "#bbb", animation: "pulse 1.4s ease infinite" }}>Vui lòng không đóng cửa sổ</div>
          </div>
        )}

        {/* Done Screen */}
        {screen === "done" && (
          <div style={{ padding: "40px 24px", textAlign: "center" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#ae2070,#d82d8b)", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", animation: "pop .4s ease", boxShadow: "0 8px 24px #ae207040" }}>
              <span style={{ fontSize: 34, color: "#fff" }}>✓</span>
            </div>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#1a0a2e", marginBottom: 6 }}>Thanh toán thành công!</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#ae2070", marginBottom: 8 }}>{amount.toLocaleString("vi-VN")}đ</div>
            <div style={{ fontSize: 12, color: "#bbb" }}>Mã GD: <span style={{ color: "#ae2070", fontWeight: 700 }}>MOMO{Date.now().toString().slice(-8)}</span></div>
          </div>
        )}

        {/* Footer */}
        <div style={{ background: "#faf0f6", padding: "10px 20px", textAlign: "center" }}>
          <span style={{ fontSize: 11, color: "#ccc" }}>🔒 Bảo mật bởi MoMo — SSL 256-bit</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// VNPAY POPUP
// ============================================================
function VNPayPopup({ amount, orderId, onSuccess, onCancel }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "#00000099", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}
      onClick={e => { if (e.target === e.currentTarget) onCancel(); }}>
      <div style={{ background: "#fff", borderRadius: 24, width: 360, overflow: "hidden", boxShadow: "0 32px 80px #00000080", fontFamily: "'Segoe UI', sans-serif", animation: "momoIn .25s ease" }}>
        
        {/* Header VNPay */}
        <div style={{ background: "linear-gradient(135deg,#005baa,#0078d4)", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ background: "#fff", borderRadius: 12, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900, color: "#005baa" }}>VN</div>
            <div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 17, letterSpacing: 0.5 }}>VNPAY-QR</div>
              <div style={{ color: "#cce4f7", fontSize: 11 }}>Cổng thanh toán quốc gia</div>
            </div>
          </div>
          <button onClick={onCancel} style={{ background: "#ffffff25", border: "none", color: "#fff", borderRadius: 10, width: 32, height: 32, cursor: "pointer", fontSize: 16 }}>✕</button>
        </div>

        <div style={{ padding: "20px 24px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: "#999", marginBottom: 4 }}>Số tiền thanh toán</div>
            <div style={{ fontSize: 30, fontWeight: 900, color: "#005baa" }}>{amount.toLocaleString("vi-VN")}đ</div>
            <div style={{ fontSize: 11, color: "#bbb", marginTop: 2 }}>Mã đơn: <span style={{ color: "#005baa", fontWeight: 600 }}>{orderId}</span></div>
          </div>

          {/* QR Code động chuẩn VietQR cho VNPay */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <div style={{ background: "#fff", border: "3px solid #005baa", borderRadius: 16, padding: 12, boxShadow: "0 4px 20px #005baa25" }}>
              <img 
                src={`https://img.vietqr.io/image/vnpay-SỐ_TÀI_KHOẢN-compact.png?amount=${amount}&addInfo=${orderId}`} 
                alt="VNPay QR"
                style={{ width: 160, height: 160, display: "block" }}
              />
            </div>
          </div>

          <div style={{ background: "#f0f7ff", borderRadius: 12, padding: "12px 16px", marginBottom: 16, fontSize: 12, color: "#555", lineHeight: 1.8 }}>
            <div style={{ fontWeight: 700, color: "#005baa", marginBottom: 2 }}>🏦 Hướng dẫn thanh toán:</div>
            <div>1. Mở ứng dụng <b>Ngân hàng</b> hoặc <b>Ví VNPay</b></div>
            <div>2. Chọn chức năng <b>Quét mã QR</b></div>
            <div>3. Kiểm tra thông tin và xác nhận</div>
          </div>

          <button onClick={onSuccess} style={{ width: "100%", padding: 14, borderRadius: 12, border: "none", background: "linear-gradient(135deg,#005baa,#0078d4)", color: "#fff", cursor: "pointer", fontWeight: 800, fontSize: 15 }}>
            Tôi đã hoàn tất thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CHECKOUT PAGE
// ============================================================
export default function CheckoutPage({ setPage }) {
  const { cart, dispatch, cartTotal, user, setOrders, showToast } = useApp();
  const [address,    setAddress]    = useState("");
  const [payMethod,  setPayMethod]  = useState("cod");
  const [memberType, setMemberType] = useState("regular");
  const [done,       setDone]       = useState(false);
  const [showMomo,   setShowMomo]   = useState(false);
  const [momoOrder,  setMomoOrder]  = useState(null);
  const [showVNPay, setShowVNPay] = useState(false);

  const payStrategies  = { cod: new CODPayment(), momo: new MomoPayment(), credit: new CreditCardPayment(), vnpay: new VNPayPayment() };
  const discStrategies = { regular: new RegularDiscount(), vip: new VIPDiscount() };

  const discResult = discStrategies[memberType].apply(cartTotal);
  const finalTotal = discResult.finalPrice * 1.1;
  const pm = PAY_META[payMethod];
  const dm = DISC_META[memberType];

  const handleOrder = () => {
    if (!user)    { showToast("Vui lòng đăng nhập!", "error"); return; }
    if (!address) { showToast("Vui lòng nhập địa chỉ!", "error"); return; }
    const orderId = `ORDER_${Date.now()}`;
    if (payMethod === "momo") {
      setMomoOrder({ orderId, items: [...cart], total: finalTotal, address });
      setShowMomo(true);
      return;
    }
    if (payMethod === "vnpay") {
      setMomoOrder({ orderId, items: [...cart], total: finalTotal, address }); // Dùng chung state order
      setShowVNPay(true);
      return;
    }
    const result = payStrategies[payMethod].pay(finalTotal);
    setOrders(prev => [{ id: orderId, items: [...cart], total: finalTotal, address, payment: result, date: new Date().toLocaleDateString("vi-VN"), status: "Đang xử lý" }, ...prev]);
    dispatch({ type: "CLEAR" });
    showToast(result.message);
    setDone(true);
  };

  const handleMomoSuccess = () => {
    setShowMomo(false);
    const result = payStrategies["momo"].pay(finalTotal);
    setOrders(prev => [{ ...momoOrder, id: momoOrder.orderId, payment: { ...result, message: "Đã thanh toán qua Ví MoMo" }, date: new Date().toLocaleDateString("vi-VN"), status: "Đã thanh toán ✅" }, ...prev]);
    dispatch({ type: "CLEAR" });
    showToast("💜 Thanh toán MoMo thành công!");
    setDone(true);
  };

  if (done) return (
    <div style={{ textAlign: "center", padding: "80px 16px" }}>
      <div style={{ fontSize: 60, marginBottom: 16 }}>🎉</div>
      <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8, color: "#e8e8f0" }}>Đặt hàng thành công!</h2>
      <p style={{ color: "#aaa", marginBottom: 28 }}>Cảm ơn bạn đã tin tưởng TechStore</p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <button onClick={() => setPage("orders")} style={{ padding: "12px 24px", borderRadius: 12, border: "1px solid #00d4ff44", background: "#00d4ff15", color: "#00d4ff", cursor: "pointer", fontWeight: 700 }}>📋 Xem đơn hàng</button>
        <button onClick={() => setPage("home")} style={{ padding: "12px 24px", borderRadius: 12, border: "none", background: "linear-gradient(90deg,#00d4ff,#7b61ff)", color: "#fff", cursor: "pointer", fontWeight: 700 }}>Tiếp tục mua sắm</button>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 920, margin: "0 auto", padding: "32px 16px" }}>
      {showMomo && momoOrder && <MomoPopup amount={Math.round(finalTotal)} orderId={momoOrder.orderId} onSuccess={handleMomoSuccess} onCancel={() => setShowMomo(false)} />}
      {showVNPay && momoOrder && <VNPayPopup amount={Math.round(finalTotal)} orderId={momoOrder.orderId} onSuccess={handlePaymentSuccess} onCancel={() => setShowVNPay(false)} />}
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <h2 style={{ fontSize: 26, fontWeight: 900, margin: 0, color: "#e8e8f0" }}>💳 Thanh toán</h2>
          <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: "#7b61ff20", border: "1px solid #7b61ff60", color: "#7b61ff", fontWeight: 700, letterSpacing: 1 }}>STRATEGY PATTERN</span>
        </div>
        <p style={{ color: "#555", fontSize: 13, margin: 0 }}>Mỗi phương thức là một <code style={{ background: "#ffffff10", padding: "1px 6px", borderRadius: 4, color: "#00d4ff" }}>class</code> riêng — tất cả implement chung <code style={{ background: "#ffffff10", padding: "1px 6px", borderRadius: 4, color: "#00d4ff" }}>pay(amount)</code></p>
      </div>

      {/* Live Class Diagram */}
      <div style={{ background: "linear-gradient(135deg,#0d1117,#161b22)", border: "1px solid #30363d", borderRadius: 16, padding: "20px 24px", marginBottom: 28, fontFamily: "monospace", overflowX: "auto" }}>
        <div style={{ fontSize: 11, color: "#7b61ff", letterSpacing: 2, marginBottom: 14, fontWeight: 700 }}>⚙️ STRATEGY PATTERN — LIVE CLASS DIAGRAM</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 700 }}>
          <div style={{ background: "#1f2937", border: "2px solid #374151", borderRadius: 10, padding: "12px 16px", minWidth: 130, textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>«context»</div>
            <div style={{ color: "#f9fafb", fontWeight: 700, fontSize: 13 }}>OrderController</div>
            <div style={{ borderTop: "1px solid #374151", marginTop: 8, paddingTop: 8, fontSize: 11, color: "#6b7280", textAlign: "left" }}>
              <div>strategy: <span style={{ color: "#00d4ff" }}>IPayment</span></div>
              <div style={{ marginTop: 4, color: "#fbbf24" }}>strategy.<span style={{ color: "#34d399" }}>pay</span>(amt)</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}><div style={{ width: 36, height: 2, background: "#4b5563" }} /><div style={{ fontSize: 9, color: "#4b5563" }}>uses</div></div>
          <div style={{ background: "#1a1a2e", border: "2px solid #7b61ff88", borderRadius: 10, padding: "12px 16px", minWidth: 120, textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#7b61ff", marginBottom: 4 }}>«interface»</div>
            <div style={{ color: "#c4b5fd", fontWeight: 700, fontSize: 13 }}>IPayment</div>
            <div style={{ borderTop: "1px solid #7b61ff33", marginTop: 8, paddingTop: 8, fontSize: 11, color: "#7b61ff" }}>+ <span style={{ color: "#34d399" }}>pay</span>(amount)</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}><div style={{ width: 36, height: 2, background: "#4b5563" }} /><div style={{ fontSize: 9, color: "#4b5563" }}>impl</div></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {Object.entries(PAY_META).map(([k, m]) => {
              const active = payMethod === k;
              return (
                <div key={k} style={{ background: active ? `${m.color}18` : "#0d1117", border: `2px solid ${active ? m.color : "#30363d"}`, borderRadius: 7, padding: "5px 12px", display: "flex", alignItems: "center", gap: 7, transition: "all .2s", minWidth: 170 }}>
                  <span style={{ fontSize: 13 }}>{m.icon}</span>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: active ? m.color : "#9ca3af" }}>{m.className}</div>
                    <div style={{ fontSize: 10, color: "#4b5563" }}>+ pay(amount)</div>
                  </div>
                  {active && <span style={{ marginLeft: "auto", fontSize: 9, color: m.color, background: `${m.color}20`, padding: "1px 5px", borderRadius: 4, fontWeight: 700 }}>ACTIVE</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Section title="📍 Địa chỉ giao hàng">
            <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Nhập địa chỉ đầy đủ..." style={inputStyle} />
          </Section>

          {/* Discount */}
          <div style={{ background: "#ffffff06", borderRadius: 14, padding: "18px 20px", border: `1px solid ${dm.color}33` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#ccc" }}>🏷️ Hạng thành viên</div>
              <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, background: `${dm.color}20`, color: dm.color, border: `1px solid ${dm.color}50`, fontFamily: "monospace" }}>DiscountStrategy</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {Object.entries(DISC_META).map(([v, m]) => (
                <div key={v} onClick={() => setMemberType(v)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 12, border: memberType === v ? `1px solid ${m.color}` : "1px solid #ffffff15", background: memberType === v ? `${m.color}15` : "#ffffff05", cursor: "pointer", transition: "all .15s" }}>
                  <input type="radio" checked={memberType === v} onChange={() => setMemberType(v)} style={{ accentColor: m.color }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: memberType === v ? m.color : "#ddd" }}>{m.icon} {m.label}</div>
                    <div style={{ fontSize: 11, color: "#666", fontFamily: "monospace" }}>new {m.className}()</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment */}
          <div style={{ background: "#ffffff06", borderRadius: 14, padding: "18px 20px", border: `1px solid ${pm.color}44` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#ccc" }}>💳 Phương thức thanh toán</div>
              <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, background: "#7b61ff20", color: "#7b61ff", border: "1px solid #7b61ff50", fontFamily: "monospace" }}>PaymentStrategy</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              {Object.entries(PAY_META).map(([v, m]) => (
                <div key={v} onClick={() => setPayMethod(v)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 12, border: payMethod === v ? `1px solid ${m.color}` : "1px solid #ffffff15", background: payMethod === v ? `${m.color}15` : "#ffffff05", cursor: "pointer", transition: "all .15s" }}>
                  <input type="radio" checked={payMethod === v} onChange={() => setPayMethod(v)} style={{ accentColor: m.color }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: payMethod === v ? m.color : "#ddd" }}>{m.icon} {m.label}</div>
                    <div style={{ fontSize: 11, color: "#666", fontFamily: "monospace" }}>new {m.className}()</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: "#0d1117", borderRadius: 10, padding: "14px 16px", border: `1px solid ${pm.color}30`, fontFamily: "monospace", fontSize: 12 }}>
              <div style={{ color: "#6b7280", marginBottom: 8, fontSize: 11 }}>// Code đang chạy:</div>
              <div style={{ color: "#9ca3af" }}>const strategy = <span style={{ color: pm.color }}>new {pm.className}()</span>;</div>
              <div style={{ color: "#9ca3af", marginTop: 4 }}>const result = strategy.<span style={{ color: "#34d399" }}>pay</span>(<span style={{ color: "#fbbf24" }}>{Math.round(finalTotal).toLocaleString()}đ</span>);</div>
              <div style={{ marginTop: 10, padding: "8px 12px", background: `${pm.color}12`, border: `1px solid ${pm.color}30`, borderRadius: 8 }}>
                <div style={{ color: "#6b7280", fontSize: 10, marginBottom: 4 }}>▶ result:</div>
                <div style={{ color: pm.color }}>✓ {payStrategies[payMethod].pay(finalTotal).message}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "#1a1a2e", borderRadius: 16, padding: 24, border: "1px solid #00d4ff22" }}>
            <h3 style={{ margin: "0 0 16px", fontWeight: 800, color: "#e8e8f0" }}>Tổng kết</h3>
            {cart.map(i => (
              <div key={i.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6, color: "#aaa" }}>
                <span>{i.image} {i.name} x{i.qty}</span><span>{(i.price * i.qty).toLocaleString()}đ</span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #ffffff10", margin: "12px 0" }} />
            <Row label="Tạm tính" value={`${cartTotal.toLocaleString()}đ`} />
            {discResult.discount > 0 && <Row label="🎁 Giảm VIP -10%" value={`-${Math.round(discResult.discount).toLocaleString()}đ`} color="#f59e0b" />}
            <Row label="VAT 10%" value={`${Math.round(discResult.finalPrice * 0.1).toLocaleString()}đ`} />
            <div style={{ borderTop: "1px solid #ffffff20", margin: "12px 0", paddingTop: 12, display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: 18 }}>
              <span style={{ color: "#e8e8f0" }}>Tổng cộng</span>
              <span style={{ background: "linear-gradient(90deg,#00d4ff,#7b61ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{Math.round(finalTotal).toLocaleString()}đ</span>
            </div>
            <button onClick={handleOrder} style={{ width: "100%", padding: 14, borderRadius: 12, border: "none", background: `linear-gradient(90deg,${pm.color},${pm.color}99)`, color: "#fff", cursor: "pointer", fontWeight: 800, fontSize: 15, marginTop: 8 }}>
              {pm.icon} Thanh toán qua {pm.label}
            </button>
          </div>
          <div style={{ background: `${pm.color}10`, border: `1px solid ${pm.color}40`, borderRadius: 12, padding: "14px 16px" }}>
            <div style={{ fontSize: 11, color: "#666", marginBottom: 6, fontFamily: "monospace" }}>Active Strategy:</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20 }}>{pm.icon}</span>
              <div>
                <div style={{ fontWeight: 700, color: pm.color, fontFamily: "monospace" }}>{pm.className}</div>
                <div style={{ fontSize: 11, color: "#888" }}>{pm.desc}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
