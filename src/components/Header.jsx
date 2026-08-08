import { useCart } from "../CartContext";

export default function Header({ onOpenSignIn, showTopSearch = true }) {
  const { cartCount } = useCart();

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a href="#/" className="logo">
          <span className="logo-mark">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                d="M12 4.2c-2.1 0-3.5 1.6-3.5 3.6 0 1.7 1 3 2.4 3.6v8.2a1.1 1.1 0 0 0 2.2 0v-8.2c1.4-.6 2.4-1.9 2.4-3.6 0-2-1.4-3.6-3.5-3.6z"
                fill="#fff"
              />
            </svg>
          </span>
          <span>Swiggy</span>
        </a>

        <div className="location-pill">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-7.5 8-13a8 8 0 1 0-16 0c0 5.5 8 13 8 13z"/><circle cx="12" cy="9" r="3"/></svg>
          <span className="label">Trivandrum</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6"/></svg>
        </div>

        {showTopSearch && (
          <a href="#/search" className="topbar-search">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <span>Search for restaurants and food</span>
          </a>
        )}

        <nav className="nav-actions">
          <a href="#" className="nav-link">
            <span className="nav-emoji">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </span>
            Swiggy Corporate
          </a>
          <a href="#/search" className="nav-link">
            <span className="nav-emoji">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </span>
            Search
          </a>
          <a href="#" className="nav-link offers-link">
            <span className="nav-emoji">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.6 12.6 12.8 4.8a2 2 0 0 0-1.4-.6H5a1 1 0 0 0-1 1v6.4c0 .5.2 1 .6 1.4l7.8 7.8a2 2 0 0 0 2.8 0l4.4-4.4a2 2 0 0 0 0-2.8Z"/><circle cx="8" cy="8.5" r="1" fill="currentColor" stroke="none"/></svg>
            </span>
            Offers
            <span className="new-badge">NEW</span>
          </a>
          <a href="#/help" className="nav-link">
            <span className="nav-emoji">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.2a2.5 2.5 0 0 1 4.9.7c0 1.6-2.2 2-2.4 3.3" strokeLinecap="round"/><circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none"/></svg>
            </span>
            Help
          </a>
          <button className="nav-link signin-link" onClick={onOpenSignIn}>
            <span className="nav-emoji">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </span>
            Sign In
          </button>
          <a href="#/cart" className="nav-link cart-link">
            <span className="nav-emoji">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </span>
            Cart
            <span className="cart-badge" style={{ display: cartCount > 0 ? "flex" : "none" }}>{cartCount}</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
