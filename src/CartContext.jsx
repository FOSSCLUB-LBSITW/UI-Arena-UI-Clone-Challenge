import { createContext, useContext, useState, useEffect } from "react";
import { findMenuItem } from "./data";

const CartContext = createContext(null);

function readCart() {
  try {
    return JSON.parse(localStorage.getItem("swiggy_cart") || "{}");
  } catch {
    return {};
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readCart);

  useEffect(() => {
    localStorage.setItem("swiggy_cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(itemId, delta) {
    setCart(prev => {
      const next = { ...prev };
      const qty = (next[itemId] || 0) + delta;
      if (qty <= 0) {
        delete next[itemId];
      } else {
        next[itemId] = qty;
      }
      return next;
    });
  }

  function setQty(itemId, qty) {
    setCart(prev => {
      const next = { ...prev };
      if (qty <= 0) {
        delete next[itemId];
      } else {
        next[itemId] = qty;
      }
      return next;
    });
  }

  function clearCart() {
    setCart({});
  }

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const cartIds = Object.keys(cart);
  let cartTotal = 0;
  let cartRestaurantName = "";
  if (cartIds.length > 0) {
    const first = findMenuItem(cartIds[0]);
    if (first) cartRestaurantName = first.restaurant.name;
    cartIds.forEach(id => {
      const found = findMenuItem(id);
      if (found) cartTotal += found.item.price * cart[id];
    });
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, setQty, clearCart, cartCount, cartTotal, cartRestaurantName }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
