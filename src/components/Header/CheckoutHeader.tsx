import { Link, useNavigate } from 'react-router-dom';
import { LifeBuoy, User } from 'lucide-react';
import { useUI } from '../../hooks/useUI';

export default function CheckoutHeader() {
  const { openSignIn } = useUI();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3" aria-label="Swiggy home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white shadow-sm">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M12 2c-3 0-5.5 2.2-5.5 5.4 0 2.6 2 4 2.7 5.7.6 1.4.3 2.9-1 3.9 1 .6 2.4.9 3.8.6-.3 1.6.2 3 1.3 3.9.9-.9 1.5-2.3 1.2-3.9 1.4.3 2.9 0 3.9-.6-1.3-1-1.6-2.5-1-3.9.7-1.7 2.6-3.1 2.6-5.7C19.5 4.2 17 2 14 2h-2z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="hidden text-sm font-bold uppercase tracking-wide text-ink sm:inline">
            Secure Checkout
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => navigate('/help')}
            className="flex items-center gap-1.5 text-[15px] font-medium text-ink hover:text-brand"
          >
            <LifeBuoy size={17} /> Help
          </button>
          <button
            type="button"
            onClick={openSignIn}
            className="flex items-center gap-1.5 text-[15px] font-medium text-ink hover:text-brand"
          >
            <User size={17} /> Sign In
          </button>
        </div>
      </div>
    </header>
  );
}
