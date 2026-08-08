import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, addItem, removeItem, subtotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <h1 className="text-xl font-bold text-swiggy-dark">Your cart is empty</h1>
        <p className="text-swiggy-gray text-sm mt-2">
          You can go to home page to view more restaurants
        </p>
        <Link
          to="/"
          className="inline-block mt-6 bg-swiggy-orange text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-swiggy-orangeDark"
        >
          See restaurants near you
        </Link>
      </div>
    );
  }

  const restaurantName = items[0].restaurantName;
  const deliveryFee = 40;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + taxes;

  return (
    <div className="max-w-xl mx-auto px-4 py-8 pb-24">
      <h1 className="text-xl font-bold text-swiggy-dark">Your Cart</h1>
      <p className="text-sm text-swiggy-gray mt-1">Items from {restaurantName}</p>

      <div className="mt-6 bg-white border border-swiggy-border rounded-xl divide-y divide-swiggy-border">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4 p-4">
            <div className="min-w-0">
              <h3 className="font-semibold text-swiggy-dark truncate">{item.name}</h3>
              <p className="text-sm text-swiggy-gray mt-0.5">₹{item.price}</p>
            </div>
            <div className="flex items-center gap-3 bg-white border border-swiggy-border rounded-lg px-2 py-1.5 text-swiggy-green font-bold text-sm shrink-0">
              <button onClick={() => removeItem(item.id)} className="px-1">−</button>
              <span>{item.qty}</span>
              <button onClick={() => addItem(item, { id: item.restaurantId, name: item.restaurantName })} className="px-1">+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white border border-swiggy-border rounded-xl p-4 space-y-2 text-sm">
        <Row label="Item Total" value={`₹${subtotal}`} />
        <Row label="Delivery Fee" value={`₹${deliveryFee}`} />
        <Row label="Taxes and Charges" value={`₹${taxes}`} />
        <div className="border-t border-swiggy-border pt-2 mt-2">
          <Row label="To Pay" value={`₹${total}`} bold />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={clearCart}
          className="flex-1 border border-swiggy-border text-swiggy-dark font-semibold rounded-lg py-3 hover:bg-swiggy-lightGray"
        >
          Clear Cart
        </button>
        <button className="flex-1 bg-swiggy-orange text-white font-semibold rounded-lg py-3 hover:bg-swiggy-orangeDark">
          Proceed to Pay
        </button>
      </div>
    </div>
  );
}

function Row({ label, value, bold }) {
  return (
    <div className={`flex justify-between ${bold ? "font-bold text-swiggy-dark" : "text-swiggy-gray"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
