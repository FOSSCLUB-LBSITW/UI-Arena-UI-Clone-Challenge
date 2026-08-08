import { useParams, Link } from "react-router-dom";
import { restaurants } from "../data/restaurants";
import { useCart } from "../context/CartContext";

export default function Restaurant() {
  const { id } = useParams();
  const restaurant = restaurants.find((r) => r.id === id);
  const { items, addItem, removeItem } = useCart();

  if (!restaurant) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <p className="text-swiggy-gray">Restaurant not found.</p>
        <Link to="/" className="text-swiggy-orange font-semibold">Back to home</Link>
      </div>
    );
  }

  function qtyOf(itemId) {
    return items.find((i) => i.id === itemId)?.qty || 0;
  }

  return (
    <div>
      {/* Banner */}
      <div className="relative h-48 md:h-64 w-full">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-10 relative">
        <div className="bg-white rounded-2xl shadow-card p-5">
          <h1 className="text-2xl font-extrabold text-swiggy-dark">{restaurant.name}</h1>
          <p className="text-swiggy-gray text-sm mt-1">{restaurant.cuisines.join(", ")}</p>
          <div className="flex items-center gap-3 mt-3 text-sm">
            <span className="flex items-center gap-1 bg-swiggy-green text-white px-2 py-0.5 rounded font-semibold">
              ★ {restaurant.rating}
            </span>
            <span className="text-swiggy-gray">{restaurant.deliveryTime}</span>
            <span className="text-swiggy-gray">•</span>
            <span className="text-swiggy-gray">{restaurant.priceForTwo}</span>
          </div>
        </div>

        {/* Menu */}
        <div className="mt-8 pb-16">
          <h2 className="text-lg font-bold text-swiggy-dark border-b border-swiggy-border pb-3">
            Menu ({restaurant.menu.length})
          </h2>
          <div className="divide-y divide-swiggy-border">
            {restaurant.menu.map((item) => {
              const qty = qtyOf(item.id);
              return (
                <div key={item.id} className="flex items-center justify-between gap-4 py-5">
                  <div className="flex-1 min-w-0">
                    <VegBadge veg={item.veg} />
                    <h3 className="font-semibold text-swiggy-dark mt-1">{item.name}</h3>
                    <p className="text-sm text-swiggy-dark mt-0.5">₹{item.price}</p>
                    <p className="text-sm text-swiggy-gray mt-1 line-clamp-2">{item.description}</p>
                  </div>
                  <div className="shrink-0 flex flex-col items-center w-28">
                    <img src={item.image} alt={item.name} className="w-28 h-20 object-cover rounded-lg" />
                    {qty === 0 ? (
                      <button
                        onClick={() => addItem(item, restaurant)}
                        className="-mt-3 bg-white border border-swiggy-border text-swiggy-green font-bold text-sm rounded-lg px-5 py-1.5 shadow-card hover:bg-swiggy-lightGray"
                      >
                        ADD
                      </button>
                    ) : (
                      <div className="-mt-3 flex items-center gap-3 bg-white border border-swiggy-border rounded-lg px-2 py-1.5 shadow-card text-swiggy-green font-bold text-sm">
                        <button onClick={() => removeItem(item.id)} className="px-1">−</button>
                        <span>{qty}</span>
                        <button onClick={() => addItem(item, restaurant)} className="px-1">+</button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function VegBadge({ veg }) {
  return (
    <span
      className={`inline-block w-4 h-4 border-2 rounded-sm ${
        veg ? "border-swiggy-green" : "border-red-600"
      }`}
    >
      <span
        className={`block w-1.5 h-1.5 rounded-full m-auto mt-[3px] ${
          veg ? "bg-swiggy-green" : "bg-red-600"
        }`}
      />
    </span>
  );
}
