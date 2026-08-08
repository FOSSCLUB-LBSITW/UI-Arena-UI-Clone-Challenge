import { Link } from "react-router-dom";

export default function RestaurantCard({ restaurant }) {
  return (
    <Link
      to={`/restaurant/${restaurant.id}`}
      className="block group cursor-pointer"
    >
      <div className="relative rounded-2xl overflow-hidden shadow-card">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {restaurant.offer && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white text-xs font-semibold px-3 py-2">
            {restaurant.offer}
          </div>
        )}
      </div>
      <div className="mt-2.5">
        <h3 className="font-bold text-swiggy-dark text-base truncate">
          {restaurant.name}
        </h3>
        <div className="flex items-center gap-1 text-sm mt-0.5">
          <span className="flex items-center gap-1 text-swiggy-dark font-medium">
            ★ {restaurant.rating}
          </span>
          <span className="text-swiggy-gray">•</span>
          <span className="text-swiggy-gray">{restaurant.deliveryTime}</span>
        </div>
        <p className="text-swiggy-gray text-sm truncate mt-0.5">
          {restaurant.cuisines.join(", ")}
        </p>
        <p className="text-swiggy-gray text-sm">{restaurant.priceForTwo}</p>
      </div>
    </Link>
  );
}
