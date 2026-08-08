import React, { useState } from 'react';
import { useSwiggy } from '../context/SwiggyContext';
import { MenuItem, Restaurant } from '../types/swiggy';
import { ItemCustomizationModal } from '../components/ItemCustomizationModal';
import {
  Star,
  Search,
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
  Sparkles,
  ArrowLeft,
  ShoppingBag
} from 'lucide-react';

export const RestaurantDetailPage: React.FC = () => {
  const {
    selectedRestaurantId,
    restaurants,
    setActivePage,
    cart,
    addToCart,
    updateQuantity
  } = useSwiggy();

  const restaurant: Restaurant | undefined = restaurants.find(r => r.id === selectedRestaurantId) || restaurants[0];

  const [menuSearch, setMenuSearch] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);

  if (!restaurant) return null;

  // Filter menu items
  let menuItems = restaurant.menu;
  if (vegOnly) {
    menuItems = menuItems.filter(m => m.type === 'veg');
  }
  if (menuSearch) {
    const q = menuSearch.toLowerCase();
    menuItems = menuItems.filter(
      m => m.name.toLowerCase().includes(q) || m.category.toLowerCase().includes(q)
    );
  }

  // Group by category
  const categoriesMap = menuItems.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const toggleCategoryCollapse = (catName: string) => {
    setCollapsedCategories(prev => ({ ...prev, [catName]: !prev[catName] }));
  };

  const getCartQuantityForItem = (itemId: string) => {
    const items = cart.filter(c => c.menuItem.id === itemId && c.restaurantId === restaurant.id);
    return items.reduce((sum, i) => sum + i.quantity, 0);
  };

  const getItemCartKey = (itemId: string) => {
    const item = cart.find(c => c.menuItem.id === itemId && c.restaurantId === restaurant.id);
    return item ? item.cartItemId : null;
  };

  const handleAddItem = (item: MenuItem) => {
    if (item.customizable && item.optionGroups && item.optionGroups.length > 0) {
      setCustomizingItem(item);
    } else {
      addToCart(item, { id: restaurant.id, name: restaurant.name });
    }
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-28">
      
      {/* Back Button */}
      <button
        onClick={() => setActivePage('home')}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-orange-500 mb-4 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Restaurants</span>
      </button>

      {/* Restaurant Header Card */}
      <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 mb-8 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {restaurant.name}
            </h1>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              {restaurant.cuisines.join(', ')}
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{restaurant.locality}, {restaurant.areaName}</span>
              <span>•</span>
              <span className="font-bold text-slate-700">{restaurant.distanceKm} km</span>
            </div>
          </div>

          {/* Rating Badge Box */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-2 shrink-0">
            <div className="flex items-center gap-1 bg-emerald-600 text-white font-black text-sm px-2 py-0.5 rounded-lg shadow-xs">
              <Star className="w-3.5 h-3.5 fill-white text-white" />
              <span>{restaurant.rating}</span>
            </div>
            <div className="text-[10px] font-bold text-slate-400 border-t sm:border-t border-slate-200 pt-1 text-center">
              {restaurant.totalRatingsString}
            </div>
          </div>
        </div>

        {/* SLA & Cost banner */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-6 text-xs font-extrabold text-slate-800">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-orange-500" />
            <span>{restaurant.slaString}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">|</span>
            <span>{restaurant.costForTwoString}</span>
          </div>
        </div>

        {/* Offer Banner */}
        {restaurant.discountHeader && (
          <div className="mt-4 bg-orange-50 border border-orange-200/80 p-3 rounded-2xl flex items-center gap-2 text-xs font-extrabold text-orange-800">
            <Sparkles className="w-4 h-4 text-orange-500 shrink-0" />
            <span>
              {restaurant.discountHeader} {restaurant.discountSubHeader} | Use Code SWIGGY50
            </span>
          </div>
        )}
      </div>

      {/* Pure Veg Switch & Menu Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
        
        {/* Pure Veg Toggle */}
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <div className="relative">
            <input
              type="checkbox"
              checked={vegOnly}
              onChange={e => setVegOnly(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-11 h-6 rounded-full transition-colors ${
                vegOnly ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            />
            <div
              className={`w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform ${
                vegOnly ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </div>
          <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
            Pure Veg Only
          </span>
        </label>

        {/* Search in Menu */}
        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search for dishes in menu..."
            value={menuSearch}
            onChange={e => setMenuSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-hidden focus:border-orange-500"
          />
        </div>
      </div>

      {/* Menu Categories Accordion List */}
      <div className="space-y-8">
        {Object.keys(categoriesMap).length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs font-semibold">
            No dishes match your filter criteria.
          </div>
        ) : (
          Object.entries(categoriesMap).map(([categoryName, items]) => {
            const isCollapsed = collapsedCategories[categoryName];
            return (
              <div key={categoryName} className="border-b border-slate-200 pb-6">
                
                {/* Category Title */}
                <button
                  onClick={() => toggleCategoryCollapse(categoryName)}
                  className="w-full flex items-center justify-between py-2 text-left group cursor-pointer mb-4"
                >
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <span>{categoryName}</span>
                    <span className="text-xs text-slate-400 font-semibold">({items.length})</span>
                  </h2>
                  {isCollapsed ? (
                    <ChevronDown className="w-5 h-5 text-slate-500 group-hover:text-orange-500" />
                  ) : (
                    <ChevronUp className="w-5 h-5 text-slate-500 group-hover:text-orange-500" />
                  )}
                </button>

                {/* Items List */}
                {!isCollapsed && (
                  <div className="divide-y divide-slate-100">
                    {items.map(item => {
                      const qty = getCartQuantityForItem(item.id);
                      const cartKey = getItemCartKey(item.id);

                      return (
                        <div
                          key={item.id}
                          className="py-5 flex items-start justify-between gap-4 group"
                        >
                          {/* Item Left Details */}
                          <div className="flex-1 pr-2">
                            {/* Veg/Non-veg icon */}
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${
                                  item.type === 'veg' ? 'border-emerald-600' : 'border-red-600'
                                }`}
                                title={item.type.toUpperCase()}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    item.type === 'veg' ? 'bg-emerald-600' : 'bg-red-600'
                                  }`}
                                />
                              </span>

                              {item.isBestseller && (
                                <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md">
                                  BESTSELLER
                                </span>
                              )}
                            </div>

                            {/* Item Name */}
                            <h3 className="font-extrabold text-slate-900 text-base group-hover:text-orange-600 transition-colors">
                              {item.name}
                            </h3>

                            {/* Price */}
                            <div className="flex items-center gap-2 mt-1 text-sm font-black text-slate-900">
                              <span>₹{item.price}</span>
                              {item.originalPrice && (
                                <span className="text-xs text-slate-400 line-through font-normal">
                                  ₹{item.originalPrice}
                                </span>
                              )}
                            </div>

                            {/* Rating */}
                            {item.rating && (
                              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 mt-1">
                                <span>★ {item.rating}</span>
                                {item.ratingCount && (
                                  <span className="text-slate-400 font-normal">({item.ratingCount})</span>
                                )}
                              </div>
                            )}

                            {/* Description */}
                            <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                              {item.description}
                            </p>
                          </div>

                          {/* Item Right Image + ADD Button */}
                          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />

                            {/* ADD Button Overlay */}
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 z-10 w-24">
                              {qty > 0 && cartKey ? (
                                <div className="bg-white border border-emerald-500 rounded-xl shadow-md flex items-center justify-between text-emerald-600 font-black text-sm py-1.5 px-2">
                                  <button
                                    onClick={() => updateQuantity(cartKey, -1)}
                                    className="px-1 hover:text-emerald-800 cursor-pointer"
                                  >
                                    -
                                  </button>
                                  <span>{qty}</span>
                                  <button
                                    onClick={() => handleAddItem(item)}
                                    className="px-1 hover:text-emerald-800 cursor-pointer"
                                  >
                                    +
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => handleAddItem(item)}
                                  className="w-full bg-white border border-slate-200 hover:border-orange-500 text-emerald-600 font-black text-xs uppercase py-2 rounded-xl shadow-md transition-all cursor-pointer hover:bg-emerald-50 text-center"
                                >
                                  ADD
                                </button>
                              )}
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Floating Bottom Cart Bar if items in cart */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-16 md:bottom-6 left-1/2 -translate-x-1/2 z-30 w-11/12 max-w-xl bg-slate-900 text-white rounded-2xl p-4 shadow-2xl flex items-center justify-between border border-slate-800 animate-slide-up">
          <div>
            <div className="text-xs font-bold text-slate-300">
              {cartItemCount} {cartItemCount === 1 ? 'ITEM' : 'ITEMS'} ADDED
            </div>
            <div className="text-sm font-black text-white">
              From {restaurant.name}
            </div>
          </div>

          <button
            onClick={() => setActivePage('cart')}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase px-5 py-2.5 rounded-xl transition-colors cursor-pointer shadow-md"
          >
            <span>View Cart</span>
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Customization Modal */}
      {customizingItem && (
        <ItemCustomizationModal
          item={customizingItem}
          restaurant={{ id: restaurant.id, name: restaurant.name }}
          onClose={() => setCustomizingItem(null)}
        />
      )}

    </div>
  );
};
