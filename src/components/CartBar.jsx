import { useCart } from "../CartContext";

export default function CartBar({ hidden }) {
  const { cartCount, cartTotal, cartRestaurantName } = useCart();

  if (hidden || cartCount === 0) return null;

  return (
    <a href="#/cart" className="cart-bar">
      <div className="cart-bar-left">
        <span className="cart-bar-icon">🛒</span>
        <div>
          <div className="cart-bar-count">{cartCount} item{cartCount > 1 ? "s" : ""} added</div>
          <div className="cart-bar-sub">from {cartRestaurantName}</div>
        </div>
      </div>
      <div className="cart-bar-right">
        <span>₹{cartTotal}</span>
        <span>View Cart</span>
        <span>→</span>
      </div>
    </a>
  );
}
