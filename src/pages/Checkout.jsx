import { findMenuItem, onImgError } from "../data";
import { useCart } from "../CartContext";

export default function Checkout() {
  const { cart, addToCart } = useCart();

  const cartIds = Object.keys(cart);
  const groups = {};
  cartIds.forEach(itemId => {
    const found = findMenuItem(itemId);
    if (!found) return;
    const rid = found.restaurant.id;
    if (!groups[rid]) groups[rid] = { restaurant: found.restaurant, items: [] };
    groups[rid].items.push({ ...found.item, qty: cart[itemId] });
  });
  const restaurantIds = Object.keys(groups);

  if (restaurantIds.length === 0) {
    return (
      <>
        <header className="checkout-topbar">
          <a href="#/" className="logo"><span className="logo-mark small">
  <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_800,h_800/portal/m/logo_192x192.png" alt="Swiggy" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 6 }} />
</span>Swiggy<span className="dot">.</span></a>
          <span className="checkout-label">SECURE CHECKOUT</span>
          <div className="checkout-topbar-right">
            <a href="#/help" className="nav-link">🆘 Help</a>
            <a href="#/" className="nav-link">👤 Sign In</a>
          </div>
        </header>
        <div className="empty-state">
          <div style={{ fontSize: 60 }}>🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add items to your cart before checking out</p>
          <a href="#/" className="primary-btn">See restaurants near you</a>
        </div>
      </>
    );
  }

  const group = groups[restaurantIds[0]];
  const itemsTotal = group.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const deliveryFee = itemsTotal > 0 ? 23 : 0;
  const gst = Math.round(itemsTotal * 0.08);
  const total = itemsTotal + deliveryFee + gst;

  return (
    <>
      <header className="checkout-topbar">
        <a href="#/" className="logo"><span className="logo-mark small">
  <img src="https://upload.wikimedia.org/wikipedia/commons/1/13/Swiggy_logo.png?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=thumbnail_unscaled" alt="Swiggy" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 6 }} />
</span>Swiggy<span className="dot">.</span></a>
        <span className="checkout-label">SECURE CHECKOUT</span>
        <div className="checkout-topbar-right">
          <a href="#/help" className="nav-link">🆘 Help</a>
          <a href="#/" className="nav-link">👤 Sign In</a>
        </div>
      </header>

      <div className="checkout-wrap">
        <div className="checkout-steps">
          <div className="checkout-step">
            <div className="checkout-step-num">1</div>
            <div className="checkout-step-body">
              <h3>Account</h3>
              <p>To place your order now, log in to your existing account or sign up.</p>
              <div className="checkout-auth-row">
                <button className="social-btn" style={{ marginBottom: 0 }} onClick={() => alert("Demo build: login is not wired to a backend.")}>Have an account? LOG IN</button>
                <button className="primary-btn" style={{ background: "var(--green)" }} onClick={() => alert("Demo build: sign up is not wired to a backend.")}>New to Swiggy? SIGN UP</button>
              </div>
            </div>
          </div>

          <div className="checkout-step">
            <div className="checkout-step-num">2</div>
            <div className="checkout-step-body">
              <h3>📍 Delivery address</h3>
              <p>Sign in to select or add a delivery address for this order.</p>
            </div>
          </div>

          <div className="checkout-step">
            <div className="checkout-step-num">3</div>
            <div className="checkout-step-body">
              <h3>💳 Payment</h3>
              <p>UPI, cards, net banking and wallets will appear here once you're signed in.</p>
            </div>
          </div>
        </div>

        <div className="bill-box checkout-summary">
          <div className="checkout-summary-header">
            <img src={group.restaurant.image} alt={group.restaurant.name} onError={onImgError} />
            <div>
              <h3 style={{ marginBottom: 2 }}>{group.restaurant.name}</h3>
              <p style={{ fontSize: 12, color: "var(--gray)" }}>{group.restaurant.cuisines}</p>
            </div>
          </div>

          {group.items.map(i => (
            <div className="cart-item" key={i.id}>
              <div>
                <div className="item-name">{i.qty} x {i.name}</div>
              </div>
              <div className="cart-item-right">
                <div className="qty-stepper">
                  <button onClick={() => addToCart(i.id, -1)}>-</button>
                  <span>{i.qty}</span>
                  <button onClick={() => addToCart(i.id, 1)}>+</button>
                </div>
                <div style={{ fontWeight: 600 }}>₹{i.price * i.qty}</div>
              </div>
            </div>
          ))}

          <h3 style={{ marginTop: 16 }}>Bill Details</h3>
          <div className="bill-row"><span>Item Total</span><span>₹{itemsTotal}</span></div>
          <div className="bill-row"><span>Delivery Fee | 2.4 kms</span><span>₹{deliveryFee}</span></div>
          <div className="bill-row"><span>GST & Other Charges</span><span>₹{gst}</span></div>
          <div className="bill-row total"><span>To Pay</span><span>₹{total}</span></div>
          <button
            className="primary-btn"
            style={{ marginTop: 16 }}
            onClick={() => alert("Demo build: payment gateway is not wired to a backend.")}
          >
            Sign in to place order
          </button>
        </div>
      </div>
    </>
  );
}
