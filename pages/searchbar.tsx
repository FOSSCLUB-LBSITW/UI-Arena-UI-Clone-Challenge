import React, { useState } from 'react';
import { useSwiggy } from '../context/SwiggyContext';
import { Search, X, Utensils, Star, ArrowRight } from 'lucide-react';
import { RestaurantCard } from '../components/RestaurantCard';

const POPULAR_SEARCH_CHIPS = [
  'Biryani',
  'Pizza',
  'Burger',
  'Paneer Butter Masala',
  'South Indian',
  'Chinese Noodles',
  'Momos',
  'Rolls',
  'Ice Cream',
  'Cake'
];

export const SearchPage: React.FC = () => {
  const { searchQuery, setSearchQuery, restaurants, setSelectedRestaurantId, setActivePage } = useSwiggy();
  const [activeTab, setActiveTab] = useState<'all' | 'dishes' | 'restaurants'>('all');

  const query = searchQuery.trim().toLowerCase();

  // Find matching restaurants
  const matchedRestaurants = query
    ? restaurants.filter(
        r =>
          r.name.toLowerCase().includes(query) ||
          r.cuisines.some(c => c.toLowerCase().includes(query)) ||
          r.areaName.toLowerCase().includes(query)
      )
    : [];

  // Find matching dishes across all restaurants
  const matchedDishes: { restaurant: typeof restaurants[0]; menuItem: typeof restaurants[0]['menu'][0] }[] = [];
  if (query) {
    restaurants.forEach(rest => {
      rest.menu.forEach(item => {
        if (
          item.name.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
        ) {
          matchedDishes.push({ restaurant: rest, menuItem: item });
        }
      });
    });
  }

  const handleSelectRestaurant = (id: string) => {
    setSelectedRestaurantId(id);
    setActivePage('restaurant');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-28">
      
      {/* Search Input Bar */}
      <div className="relative mb-6">
        <Search className="w-6 h-6 text-orange-500 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          autoFocus
          placeholder="Search for restaurants, cuisines or dishes..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-14 pr-12 py-4 bg-white border border-slate-200 rounded-2xl text-base font-bold shadow-xs focus:outline-hidden focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all text-slate-900"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Popular Search Chips if search input empty */}
      {!query && (
        <div className="space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
            Popular Cuisines & Dishes
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {POPULAR_SEARCH_CHIPS.map(chip => (
              <button
                key={chip}
                onClick={() => setSearchQuery(chip)}
                className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 border border-transparent text-xs font-bold text-slate-700 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span>{chip}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results view */}
      {query && (
        <div className="space-y-6">
          
          {/* Tabs */}
          <div className="flex items-center gap-4 border-b border-slate-200 pb-3 text-xs font-extrabold text-slate-600">
            <button
              onClick={() => setActiveTab('all')}
              className={`pb-2 transition-colors cursor-pointer ${
                activeTab === 'all'
                  ? 'text-orange-500 border-b-2 border-orange-500 font-black'
                  : 'hover:text-slate-900'
              }`}
            >
              All Results ({matchedRestaurants.length + matchedDishes.length})
            </button>
            <button
              onClick={() => setActiveTab('dishes')}
              className={`pb-2 transition-colors cursor-pointer ${
                activeTab === 'dishes'
                  ? 'text-orange-500 border-b-2 border-orange-500 font-black'
                  : 'hover:text-slate-900'
              }`}
            >
              Dishes ({matchedDishes.length})
            </button>
            <button
              onClick={() => setActiveTab('restaurants')}
              className={`pb-2 transition-colors cursor-pointer ${
                activeTab === 'restaurants'
                  ? 'text-orange-500 border-b-2 border-orange-500 font-black'
                  : 'hover:text-slate-900'
              }`}
            >
              Restaurants ({matchedRestaurants.length})
            </button>
          </div>

          {/* Dishes Results */}
          {(activeTab === 'all' || activeTab === 'dishes') && matchedDishes.length > 0 && (
            <div>
              <h3 className="font-extrabold text-slate-900 text-base mb-4">Dishes Matching "{searchQuery}"</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchedDishes.slice(0, 12).map(({ restaurant, menuItem }) => (
                  <div
                    key={`${restaurant.id}-${menuItem.id}`}
                    onClick={() => handleSelectRestaurant(restaurant.id)}
                    className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-orange-300 transition-all cursor-pointer flex items-center justify-between gap-4 group shadow-2xs"
                  >
                    <div className="flex-1 pr-2">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                        By {restaurant.name}
                      </div>
                      <h4 className="font-extrabold text-slate-900 text-sm group-hover:text-orange-600 transition-colors">
                        {menuItem.name}
                      </h4>
                      <div className="text-xs font-black text-slate-900 mt-1">₹{menuItem.price}</div>
                    </div>

                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                      <img
                        src={menuItem.imageUrl}
                        alt={menuItem.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Restaurant Results */}
          {(activeTab === 'all' || activeTab === 'restaurants') && matchedRestaurants.length > 0 && (
            <div>
              <h3 className="font-extrabold text-slate-900 text-base mb-4">
                Restaurants Matching "{searchQuery}"
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchedRestaurants.map(rest => (
                  <RestaurantCard key={rest.id} restaurant={rest} />
                ))}
              </div>
            </div>
          )}

          {/* Empty search fallback */}
          {matchedRestaurants.length === 0 && matchedDishes.length === 0 && (
            <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <Utensils className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h3 className="font-bold text-slate-800 text-base">No results found for "{searchQuery}"</h3>
              <p className="text-xs text-slate-500 mt-1">Check for spelling or try searching another dish.</p>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
