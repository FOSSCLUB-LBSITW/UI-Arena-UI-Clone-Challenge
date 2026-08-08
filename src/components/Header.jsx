import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { totalItems, setSignInOpen } = useCart();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-swiggy-border">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-16">
        <Link to="/" className="flex items-center gap-1 shrink-0">
          <span className="text-2xl font-extrabold text-swiggy-orange tracking-tight">
            Swiggy
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-swiggy-dark">
          <button
            onClick={() => navigate("/")}
            className="hover:text-swiggy-orange transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/search")}
            className="hover:text-swiggy-orange transition-colors"
          >
            Search
          </button>
          <button
            onClick={() => navigate("/help")}
            className="hover:text-swiggy-orange transition-colors"
          >
            Help
          </button>
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={() => setSignInOpen(true)}
            className="text-sm font-semibold text-swiggy-dark hover:text-swiggy-orange transition-colors"
          >
            Sign In
          </button>
          <Link
            to="/cart"
            className="relative flex items-center gap-1.5 text-sm font-semibold text-swiggy-dark hover:text-swiggy-orange transition-colors"
          >
            <CartIcon />
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 sm:static sm:ml-0.5 bg-swiggy-green text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}
