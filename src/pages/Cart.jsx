import { findMenuItem } from "../data";
import { useCart } from "../CartContext";

export default function CartPage() {
  const { cart, addToCart } = useCart();
  const groups = {};
  Object.keys(cart).forEach(itemId => {
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
        <div className="page-title-bar"><h1>Your Cart</h1></div>
        <div className="empty-state">
          <div style={{ fontSize: 60 }}>🛒</div>
          <h2>Your cart is empty</h2>
          <p>You can go to home page to view more restaurants</p>
          <a href="#/" className="primary-btn">See restaurants near you</a>
        </div>
      </>
    );
  }
  const group = groups[restaurantIds[0]];
  const itemsTotal = group.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const deliveryFee = itemsTotal > 0 ? 30 : 0;
  const gst = Math.round(itemsTotal * 0.05);
  const total = itemsTotal + deliveryFee + gst;
  return (
    <>
      <div className="page-title-bar"><h1>Your Cart</h1></div>
      <div className="cart-wrap">
        <div>
          <div className="cart-restaurant-name">{group.restaurant.name}</div>
          <div className="cart-restaurant-sub">{group.restaurant.cuisines}</div>
          {group.items.map(i => (
            <div className="cart-item" key={i.id}>
              <div>
                <div className="item-name">{i.name}</div>
                <div className="item-price">₹{i.price} x {i.qty}</div>
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
        </div>
        <div className="bill-box">
          <h3>Bill details</h3>
          <div className="bill-row"><span>Item total</span><span>₹{itemsTotal}</span></div>
          <div className="bill-row"><span>Delivery fee</span><span>₹{deliveryFee}</span></div>
          <div className="bill-row"><span>GST and charges</span><span>₹{gst}</span></div>
          <div className="bill-row total"><span>To pay</span><span>₹{total}</span></div>
          <a className="primary-btn" style={{ marginTop: 16, display: "block", textAlign: "center" }} href="#/checkout">
            Proceed to Pay
          </a>
        </div>
      </div>
    </>
  );
}
