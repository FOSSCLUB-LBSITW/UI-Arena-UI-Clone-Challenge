import React from 'react';
import { useSwiggy } from '../context/SwiggyContext';
import { MapPin, Search, Percent, HelpCircle, User, ShoppingBag, ChevronDown } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentLocation,
    setLocationModalOpen,
    setAuthDrawerOpen,
    cart,
    user,
    activePage,
    setActivePage,
    setSelectedRestaurantId
  } = useSwiggy();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navigateToHome = () => {
    setSelectedRestaurantId(null);
    setActivePage('home');
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs transition-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left Section: Logo & Location */}
        <div className="flex items-center gap-6 md:gap-8">
          {/* Swiggy Logo */}
          <button
            onClick={navigateToHome}
            className="flex items-center gap-2 group cursor-pointer text-left focus:outline-hidden"
            title="Swiggy Home"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FC8019] flex items-center justify-center text-white font-black italic text-2xl shadow-xs group-hover:scale-105 transition-transform">
              S
            </div>
            <span className="font-black text-2xl tracking-tight text-slate-900 group-hover:text-[#FC8019] transition-colors">
              Swiggy
            </span>
          </button>

          {/* Location Selector */}
          <button
            onClick={() => setLocationModalOpen(true)}
            className="hidden sm:flex items-center gap-2 text-sm text-slate-500 border-l border-slate-200 pl-6 hover:text-[#FC8019] cursor-pointer max-w-[280px]"
          >
            <MapPin className="w-4 h-4 text-[#FC8019] shrink-0" />
            <div className="truncate text-left">
              <span className="font-bold text-slate-800 mr-1.5">
                {currentLocation.split(',')[0] || 'Home'}
              </span>
              <span className="text-xs text-slate-500 truncate">
                {currentLocation.split(',').slice(1).join(',') || currentLocation}
              </span>
            </div>
            <span className="text-[#FC8019] text-xs shrink-0">▼</span>
          </button>
        </div>

        {/* Right Section: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
          
          {/* Search */}
          <button
            onClick={() => setActivePage('search')}
            className={`flex items-center gap-2 hover:text-[#FC8019] transition-colors py-1 cursor-pointer ${
              activePage === 'search' ? 'text-[#FC8019] font-bold' : ''
            }`}
          >
            <Search className="w-5 h-5" />
            <span>Search</span>
          </button>

          {/* Offers */}
          <button
            onClick={() => setActivePage('offers')}
            className={`flex items-center gap-2 hover:text-[#FC8019] transition-colors py-1 cursor-pointer relative ${
              activePage === 'offers' ? 'text-[#FC8019] font-bold' : ''
            }`}
          >
            <Percent className="w-5 h-5 text-amber-500" />
            <span>Offers</span>
            <span className="text-[10px] bg-yellow-400 text-slate-900 font-extrabold px-1.5 py-0.5 rounded uppercase">
              NEW
            </span>
          </button>

          {/* Help */}
          <button
            onClick={() => setActivePage('help')}
            className={`flex items-center gap-2 hover:text-[#FC8019] transition-colors py-1 cursor-pointer ${
              activePage === 'help' ? 'text-[#FC8019] font-bold' : ''
            }`}
          >
            <HelpCircle className="w-5 h-5" />
            <span>Help</span>
          </button>

          {/* Sign In / Account */}
          <button
            onClick={() => setAuthDrawerOpen(true)}
            className="flex items-center gap-2 hover:text-[#FC8019] transition-colors py-1 cursor-pointer"
          >
            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-xs border border-slate-200">
              {user ? user.name.charAt(0) : <User className="w-3.5 h-3.5 text-slate-600" />}
            </div>
            <span className="truncate max-w-[100px] font-semibold">
              {user ? user.name.split(' ')[0] : 'Sign In'}
            </span>
          </button>

          {/* View Cart */}
          <button
            onClick={() => setActivePage('cart')}
            className={`flex items-center gap-2 py-1.5 px-3.5 rounded-lg transition-all cursor-pointer font-bold ${
              cartItemCount > 0
                ? 'bg-[#FC8019] text-white shadow-xs hover:bg-orange-600'
                : 'hover:text-[#FC8019]'
            }`}
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#60b246] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {cartItemCount}
                </span>
              )}
            </div>
            <span>Cart</span>
          </button>

        </nav>

        {/* Mobile Quick Actions */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setActivePage('cart')}
            className="relative p-2 rounded-lg bg-[#FC8019] text-white shadow-xs"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#60b246] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartItemCount}
              </span>
            )}
          </button>
          
          <button
            onClick={() => setAuthDrawerOpen(true)}
            className="p-2 rounded-lg bg-slate-100 text-slate-700"
          >
            <User className="w-5 h-5" />
          </button>
        </div>

      </div>
    </header>
  );
};
