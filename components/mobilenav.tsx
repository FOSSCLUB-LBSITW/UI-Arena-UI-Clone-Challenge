import React from 'react';
import { useSwiggy } from '../context/SwiggyContext';
import { Home, Search, Percent, HelpCircle, ShoppingBag, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { activePage, setActivePage, cart, setAuthDrawerOpen } = useSwiggy();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-3 py-2 flex items-center justify-around text-slate-600 shadow-lg">
      
      {/* Home */}
      <button
        onClick={() => setActivePage('home')}
        className={`flex flex-col items-center gap-1 text-[11px] font-medium py-1 px-2 cursor-pointer ${
          activePage === 'home' ? 'text-orange-500 font-bold' : 'hover:text-slate-900'
        }`}
      >
        <Home className="w-5 h-5" />
        <span>Swiggy</span>
      </button>

      {/* Search */}
      <button
        onClick={() => setActivePage('search')}
        className={`flex flex-col items-center gap-1 text-[11px] font-medium py-1 px-2 cursor-pointer ${
          activePage === 'search' ? 'text-orange-500 font-bold' : 'hover:text-slate-900'
        }`}
      >
        <Search className="w-5 h-5" />
        <span>Search</span>
      </button>

      {/* Offers */}
      <button
        onClick={() => setActivePage('offers')}
        className={`flex flex-col items-center gap-1 text-[11px] font-medium py-1 px-2 cursor-pointer ${
          activePage === 'offers' ? 'text-orange-500 font-bold' : 'hover:text-slate-900'
        }`}
      >
        <Percent className="w-5 h-5" />
        <span>Offers</span>
      </button>

      {/* Cart */}
      <button
        onClick={() => setActivePage('cart')}
        className={`flex flex-col items-center gap-1 text-[11px] font-medium py-1 px-2 relative cursor-pointer ${
          activePage === 'cart' ? 'text-orange-500 font-bold' : 'hover:text-slate-900'
        }`}
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-orange-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cartItemCount}
            </span>
          )}
        </div>
        <span>Cart</span>
      </button>

      {/* Help */}
      <button
        onClick={() => setActivePage('help')}
        className={`flex flex-col items-center gap-1 text-[11px] font-medium py-1 px-2 cursor-pointer ${
          activePage === 'help' ? 'text-orange-500 font-bold' : 'hover:text-slate-900'
        }`}
      >
        <HelpCircle className="w-5 h-5" />
        <span>Help</span>
      </button>

      {/* Account */}
      <button
        onClick={() => setAuthDrawerOpen(true)}
        className="flex flex-col items-center gap-1 text-[11px] font-medium py-1 px-2 cursor-pointer hover:text-slate-900"
      >
        <User className="w-5 h-5" />
        <span>Account</span>
      </button>

    </div>
  );
};
