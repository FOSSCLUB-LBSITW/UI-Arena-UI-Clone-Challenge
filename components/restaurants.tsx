import React from 'react';
import { Restaurant } from '../types/swiggy';
import { useSwiggy } from '../context/SwiggyContext';
import { Star, Heart } from 'lucide-react';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const { setSelectedRestaurantId, setActivePage, favorites, toggleFavorite } = useSwiggy();

  const isFavorite = favorites.includes(restaurant.id);

  const handleClick = () => {
    setSelectedRestaurantId(restaurant.id);
    setActivePage('restaurant');
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer flex flex-col h-full bg-white rounded-xl p-2 overflow-hidden hover:shadow-md transition-all duration-300 border border-slate-100"
    >
      {/* Image Container */}
      <div className="relative h-36 sm:h-40 w-full overflow-hidden rounded-xl bg-slate-200 mb-3 shrink-0">
        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Gradient Overlay for Discount Banner */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-2.5">
          {restaurant.discountHeader && (
            <div className="text-white font-black text-sm uppercase tracking-tight drop-shadow-sm">
              {restaurant.discountHeader} {restaurant.discountSubHeader}
            </div>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(restaurant.id);
          }}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 backdrop-blur-xs hover:bg-white text-slate-700 transition-all cursor-pointer shadow-xs"
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={`w-3.5 h-3.5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-600'}`}
          />
        </button>

        {/* Pure Veg Tag */}
        {restaurant.isPureVeg && (
          <div className="absolute top-2 left-2 bg-[#60b246] text-white text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded shadow-xs">
            PURE VEG
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="flex-1 flex flex-col justify-between px-1">
        <div>
          <h3 className="font-bold text-base text-slate-800 group-hover:text-[#FC8019] transition-colors truncate">
            {restaurant.name}
          </h3>

          {/* Rating, Delivery Time & Cost */}
          <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-600 font-medium">
            <span className="bg-emerald-600 text-white px-1 py-0.5 rounded text-[10px] flex items-center justify-center font-bold gap-0.5">
              <Star className="w-2.5 h-2.5 fill-white text-white" />
              <span>{restaurant.rating}</span>
            </span>
            <span className="font-bold text-slate-800">{restaurant.rating}</span>
            <span>•</span>
            <span className="font-bold uppercase text-[#FC8019] text-[11px]">{restaurant.slaString}</span>
            <span>•</span>
            <span className="text-slate-500 text-[11px]">{restaurant.costForTwoString}</span>
          </div>

          {/* Cuisines */}
          <p className="text-slate-500 text-xs truncate mt-1">
            {restaurant.cuisines.join(', ')}
          </p>

          {/* Area / Locality */}
          <p className="text-slate-400 text-[11px] truncate mt-0.5">
            {restaurant.areaName}
          </p>
        </div>
      </div>
    </div>
  );
};
