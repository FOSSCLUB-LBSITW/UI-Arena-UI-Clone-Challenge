import React from 'react';
import { useSwiggy } from '../context/SwiggyContext';
import { FoodCategories } from '../components/FoodCategories';
import { TopChains } from '../components/TopChains';
import { FilterSortBar } from '../components/FilterSortBar';
import { RestaurantCard } from '../components/RestaurantCard';
import { Sparkles, UtensilsCrossed } from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    restaurants,
    searchQuery,
    selectedCuisineFilter,
    isPureVegFilter,
    sortBy,
    setActivePage
  } = useSwiggy();

  // Filter logic
  let filtered = [...restaurants];

  if (isPureVegFilter) {
    filtered = filtered.filter(r => r.isPureVeg);
  }

  if (selectedCuisineFilter) {
    const kw = selectedCuisineFilter.toLowerCase();
    filtered = filtered.filter(r =>
      r.cuisines.some(c => c.toLowerCase().includes(kw)) ||
      r.name.toLowerCase().includes(kw) ||
      r.menu.some(m => m.name.toLowerCase().includes(kw) || m.category.toLowerCase().includes(kw))
    );
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.cuisines.some(c => c.toLowerCase().includes(q)) ||
      r.areaName.toLowerCase().includes(q)
    );
  }

  // Sorting logic
  if (sortBy === 'deliveryTime') {
    filtered.sort((a, b) => a.deliveryTimeMinutes - b.deliveryTimeMinutes);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'costLow') {
    filtered.sort((a, b) => a.costForTwo - b.costForTwo);
  } else if (sortBy === 'costHigh') {
    filtered.sort((a, b) => b.costForTwo - a.costForTwo);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Promotional Banner Carousel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          onClick={() => setActivePage('offers')}
          className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-3xl p-6 text-white shadow-lg flex items-center justify-between cursor-pointer hover:shadow-orange-500/20 transition-all group overflow-hidden relative"
        >
          <div>
            <div className="inline-flex items-center gap-1 bg-white/20 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full mb-2">
              <Sparkles className="w-3 h-3" />
              <span>SWIGGY SPECIAL</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              Get 50% OFF up to ₹100
            </h2>
            <p className="text-xs text-orange-100 mt-1">Use code SWIGGY50 on orders above ₹199</p>
          </div>
          <div className="text-4xl group-hover:scale-110 transition-transform shrink-0 ml-2">
            🍕
          </div>
        </div>

        <div
          onClick={() => setActivePage('offers')}
          className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 text-white shadow-lg flex items-center justify-between cursor-pointer hover:shadow-slate-900/20 transition-all group overflow-hidden relative border border-slate-700/50"
        >
          <div>
            <div className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full mb-2 border border-amber-500/30">
              <span>SWIGGY ONE</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              Free Delivery on All Orders
            </h2>
            <p className="text-xs text-slate-300 mt-1">Plus extra up to 30% OFF at top restaurants</p>
          </div>
          <div className="text-4xl group-hover:scale-110 transition-transform shrink-0 ml-2">
            🛵
          </div>
        </div>
      </div>

      {/* Food Categories ("What's on your mind?") */}
      <FoodCategories />

      {/* Top Chains Carousel */}
      <TopChains />

      {/* Restaurant List Section */}
      <div className="pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Restaurants with online food delivery in Bengaluru
          </h2>
          <span className="text-xs font-bold text-slate-500">
            {filtered.length} restaurants found
          </span>
        </div>

        {/* Filter & Sort Controls */}
        <FilterSortBar />

        {/* Grid of Restaurants */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6">
            {filtered.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200 mt-6">
            <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center mx-auto mb-3 text-2xl">
              <UtensilsCrossed className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No restaurants found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search query, filters or pure veg settings.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
