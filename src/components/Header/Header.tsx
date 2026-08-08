import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Briefcase, Tag, LifeBuoy, User, ShoppingBag, ChevronDown, Menu, X } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useUI } from '../../hooks/useUI';

const navLinkClasses =
  'flex items-center gap-1.5 text-[15px] font-medium text-ink transition-colors hover:text-brand';

export default function Header() {
  const { totalItems } = useCart();
  const { openSignIn } = useUI();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHelp = location.pathname === '/help';
  const isSearch = location.pathname === '/search';
  const isOffers = location.pathname === '/offers';

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2" aria-label="Swiggy home">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white shadow-sm">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path
                  d="M12 2c-3 0-5.5 2.2-5.5 5.4 0 2.6 2 4 2.7 5.7.6 1.4.3 2.9-1 3.9 1 .6 2.4.9 3.8.6-.3 1.6.2 3 1.3 3.9.9-.9 1.5-2.3 1.2-3.9 1.4.3 2.9 0 3.9-.6-1.3-1-1.6-2.5-1-3.9.7-1.7 2.6-3.1 2.6-5.7C19.5 4.2 17 2 14 2h-2z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className="hidden text-lg font-extrabold tracking-tight text-ink sm:inline">Swiggy</span>
          </Link>
          <button
            className="hidden items-center gap-1 text-[15px] font-semibold text-ink underline decoration-2 underline-offset-4 sm:flex"
            type="button"
          >
            Other
            <ChevronDown size={15} className="text-brand" />
          </button>
        </div>

        <nav className="hidden items-center gap-7 lg:flex">
          <span className={`${navLinkClasses} cursor-default text-ink-light`} aria-disabled="true">
            <Briefcase size={17} /> Swiggy Corporate
          </span>
          <button onClick={() => navigate('/search')} className={`${navLinkClasses} ${isSearch ? 'text-brand' : ''}`}>
            <Search size={17} /> Search
          </button>
          <button onClick={() => navigate('/offers')} className={`${navLinkClasses} ${isOffers ? 'text-brand' : ''}`} type="button">
            <Tag size={17} /> Offers
            <span className="rounded bg-brand-light px-1 py-0.5 text-[10px] font-bold uppercase text-brand">New</span>
          </button>
          <button onClick={() => navigate('/help')} className={`${navLinkClasses} ${isHelp ? 'text-brand' : ''}`}>
            <LifeBuoy size={17} /> Help
          </button>
          <button onClick={openSignIn} className={navLinkClasses} type="button">
            <User size={17} /> Sign In
          </button>
          <button onClick={() => navigate('/cart')} className={navLinkClasses} type="button">
            <span
              className={`flex h-5 w-5 items-center justify-center rounded text-[11px] font-bold text-white ${
                totalItems > 0 ? 'bg-success' : 'bg-ink-faint'
              }`}
            >
              {totalItems}
            </span>
            Cart
          </button>
        </nav>

        <button
          className="flex items-center justify-center rounded-lg p-2 text-ink lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-line bg-white px-4 py-3 lg:hidden animate-fade-in">
          <button
            onClick={() => {
              navigate('/search');
              setMobileOpen(false);
            }}
            className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-[15px] font-medium text-ink hover:bg-surface"
          >
            <Search size={18} /> Search
          </button>
          <button
            onClick={() => {
              navigate('/offers');
              setMobileOpen(false);
            }}
            className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-[15px] font-medium text-ink hover:bg-surface"
          >
            <Tag size={18} /> Offers
          </button>
          <button
            onClick={() => {
              navigate('/help');
              setMobileOpen(false);
            }}
            className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-[15px] font-medium text-ink hover:bg-surface"
          >
            <LifeBuoy size={18} /> Help
          </button>
          <button
            onClick={() => {
              openSignIn();
              setMobileOpen(false);
            }}
            className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-[15px] font-medium text-ink hover:bg-surface"
          >
            <User size={18} /> Sign In
          </button>
          <button
            onClick={() => {
              navigate('/cart');
              setMobileOpen(false);
            }}
            className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-[15px] font-medium text-ink hover:bg-surface"
          >
            <ShoppingBag size={18} /> Cart {totalItems > 0 && `(${totalItems})`}
          </button>
        </nav>
      )}
    </header>
  );
}
