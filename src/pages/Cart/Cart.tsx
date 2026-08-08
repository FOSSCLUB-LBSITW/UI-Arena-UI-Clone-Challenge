import { useState, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, MapPin, Wallet } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useUI } from '../../hooks/useUI';
import CartLineItem from '../../components/Cart/CartLineItem';
import BillSummary from '../../components/Cart/BillSummary';
import Button from '../../components/Button/Button';
import SafeImage from '../../components/common/SafeImage';
import { foodImageFallback } from '../../utils/images';
import { computeBill } from '../../utils/format';

function CheckoutStep({
  icon,
  active,
  isLast,
  children,
}: {
  icon: ReactNode;
  active: boolean;
  isLast: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
            active ? 'bg-ink text-white' : 'border border-line bg-white text-ink-faint'
          }`}
        >
          {icon}
        </span>
        {!isLast && <span className="mt-1 w-px flex-1 border-l border-dashed border-line" />}
      </div>
      <div className={`min-w-0 flex-1 ${isLast ? 'pb-1' : 'pb-8'}`}>{children}</div>
    </div>
  );
}

export default function Cart() {
  const { restaurant, lines, itemTotal, clearCart } = useCart();
  const { openSignIn } = useUI();
  const navigate = useNavigate();
  const [noContact, setNoContact] = useState(false);
  const [instructions, setInstructions] = useState('');

  if (!restaurant || lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-[600px] flex-col items-center gap-4 px-4 py-24 text-center animate-fade-in">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-surface text-ink-faint">
          <ShoppingBag size={32} />
        </span>
        <h1 className="text-xl font-bold text-ink">Your cart is empty</h1>
        <p className="text-sm text-ink-light">You can go to the home page to view more restaurants.</p>
        <Link to="/">
          <Button className="mt-2">See restaurants near you</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1000px] px-4 pb-20 pt-8 sm:px-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex-1 rounded-xl border border-line bg-white p-5 sm:p-6">
          <CheckoutStep icon={<User size={18} />} active isLast={false}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-ink">Account</h2>
                <p className="mt-1 text-sm text-ink-light">
                  To place your order now, log in to your existing account or sign up.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    onClick={openSignIn}
                    className="rounded-lg border border-line px-5 py-2.5 text-left text-sm transition hover:border-veg"
                  >
                    <span className="block text-xs text-ink-light">Have an account?</span>
                    <span className="font-bold text-veg">LOG IN</span>
                  </button>
                  <button
                    onClick={openSignIn}
                    className="rounded-lg bg-veg px-5 py-2.5 text-left text-sm text-white transition hover:opacity-90"
                  >
                    <span className="block text-xs text-white/80">New to Swiggy?</span>
                    <span className="font-bold">SIGN UP</span>
                  </button>
                </div>
              </div>
              <span className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-light text-3xl sm:flex">
                🌯
              </span>
            </div>
          </CheckoutStep>

          <CheckoutStep icon={<MapPin size={18} />} active={false} isLast={false}>
            <h2 className="text-base font-medium text-ink-faint">Delivery address</h2>
          </CheckoutStep>

          <CheckoutStep icon={<Wallet size={18} />} active={false} isLast>
            <h2 className="text-base font-medium text-ink-faint">Payment</h2>
          </CheckoutStep>
        </div>

        <div className="w-full shrink-0 rounded-xl border border-line bg-white p-5 lg:w-80">
          <div className="flex items-center gap-3">
            <SafeImage
              src={restaurant.image}
              fallbackSrc={foodImageFallback(restaurant.id, 200, 200)}
              alt={restaurant.name}
              className="h-11 w-11 rounded-lg object-cover"
            />
            <div>
              <h2 className="text-sm font-bold text-ink">{restaurant.name}</h2>
              <p className="text-xs text-ink-light">{restaurant.location}</p>
            </div>
          </div>

          <div className="mt-3 divide-y divide-line border-t border-line">
            {lines.map((line) => (
              <CartLineItem key={line.item.id} line={line} />
            ))}
          </div>

          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Any suggestions? We will pass it on..."
            rows={2}
            className="mt-4 w-full resize-none rounded-lg bg-surface p-3 text-sm text-ink placeholder:text-ink-light focus:outline-none"
          />

          <label className="mt-4 flex items-start gap-2 rounded-lg border border-line p-3 text-sm text-ink-light">
            <input
              type="checkbox"
              checked={noContact}
              onChange={(e) => setNoContact(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-brand"
            />
            <span>
              <span className="font-semibold text-ink">Opt in for No-contact Delivery.</span> Unwell, or avoiding
              contact? Please select no-contact delivery. Partner will safely place the order outside your door (not
              for COD).
            </span>
          </label>

          <div className="mt-5 border-t border-line pt-4">
            <BillSummary itemTotal={itemTotal} />
          </div>

          <Button
            className="mt-5 w-full"
            onClick={() => {
              const { total } = computeBill(itemTotal);
              const orderId = `SW${Math.floor(100000 + Math.random() * 900000)}`;
              navigate('/order-confirmed', { state: { restaurant, lines, total, orderId } });
              clearCart();
            }}
          >
            Proceed to Pay
          </Button>
        </div>
      </div>
    </div>
  );
}
