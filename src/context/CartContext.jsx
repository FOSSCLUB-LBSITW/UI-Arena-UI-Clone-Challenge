import { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // items: [{ ...menuItem, qty, restaurantId, restaurantName }]
  const [items, setItems] = useState([]);
  const [isSignInOpen, setSignInOpen] = useState(false);

  function addItem(item, restaurant) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [
        ...prev,
        { ...item, qty: 1, restaurantId: restaurant.id, restaurantName: restaurant.name },
      ];
    });
  }

  function removeItem(itemId) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing && existing.qty > 1) {
        return prev.map((i) =>
          i.id === itemId ? { ...i, qty: i.qty - 1 } : i
        );
      }
      return prev.filter((i) => i.id !== itemId);
    });
  }

  function clearCart() {
    setItems([]);
  }

  const totalItems = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.qty * i.price, 0), [items]);

  const value = {
    items,
    addItem,
    removeItem,
    clearCart,
    totalItems,
    subtotal,
    isSignInOpen,
    setSignInOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
