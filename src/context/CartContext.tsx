import { createContext, useCallback, useMemo, useState, type ReactNode } from 'react';
import type { CartLine, MenuItem, Restaurant } from '../types';

interface CartContextValue {
  restaurant: Restaurant | null;
  lines: CartLine[];
  totalItems: number;
  itemTotal: number;
  addItem: (item: MenuItem, restaurant: Restaurant, quantity?: number) => void;
  incrementItem: (itemId: string) => void;
  decrementItem: (itemId: string) => void;
  removeItem: (itemId: string) => void;
  getQuantity: (itemId: string) => number;
  clearCart: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [lines, setLines] = useState<CartLine[]>([]);

  const addItem = useCallback((item: MenuItem, rest: Restaurant, quantity = 1) => {
    setLines((prev) => {
      // Switching restaurants clears the cart, mirroring real ordering apps.
      const sameRestaurant = !restaurant || restaurant.id === rest.id;
      const base = sameRestaurant ? prev : [];
      const existing = base.find((l) => l.item.id === item.id);
      if (existing) {
        return base.map((l) => (l.item.id === item.id ? { ...l, quantity: l.quantity + quantity } : l));
      }
      return [...base, { item, quantity }];
    });
    setRestaurant((prevR) => (prevR && prevR.id === rest.id ? prevR : rest));
  }, [restaurant]);

  const incrementItem = useCallback((itemId: string) => {
    setLines((prev) => prev.map((l) => (l.item.id === itemId ? { ...l, quantity: l.quantity + 1 } : l)));
  }, []);

  const decrementItem = useCallback((itemId: string) => {
    setLines((prev) => {
      const next = prev
        .map((l) => (l.item.id === itemId ? { ...l, quantity: l.quantity - 1 } : l))
        .filter((l) => l.quantity > 0);
      if (next.length === 0) setRestaurant(null);
      return next;
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setLines((prev) => {
      const next = prev.filter((l) => l.item.id !== itemId);
      if (next.length === 0) setRestaurant(null);
      return next;
    });
  }, []);

  const getQuantity = useCallback(
    (itemId: string) => lines.find((l) => l.item.id === itemId)?.quantity ?? 0,
    [lines]
  );

  const clearCart = useCallback(() => {
    setLines([]);
    setRestaurant(null);
  }, []);

  const totalItems = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines]);
  const itemTotal = useMemo(() => lines.reduce((sum, l) => sum + l.quantity * l.item.price, 0), [lines]);

  const value: CartContextValue = {
    restaurant,
    lines,
    totalItems,
    itemTotal,
    addItem,
    incrementItem,
    decrementItem,
    removeItem,
    getQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
