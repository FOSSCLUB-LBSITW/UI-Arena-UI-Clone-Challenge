import { useMemo } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { CheckCircle2, Clock, MapPin } from 'lucide-react';
import type { CartLine, Restaurant } from '../../types';
import { formatRupees } from '../../utils/format';
import Button from '../../components/Button/Button';
import SafeImage from '../../components/common/SafeImage';
import { foodImageFallback } from '../../utils/images';

interface OrderState {
  restaurant: Restaurant;
  lines: CartLine[];
  total: number;
  orderId: string;
}

export default function OrderConfirmed() {
  const location = useLocation();
  const state = location.state as OrderState | null;

  // Demo estimated delivery window, generated once per visit.
  const eta = useMemo(() => 25 + Math.floor(Math.random() * 15), []);

  if (!state) return <Navigate to="/" replace />;

  const { restaurant, lines, total, orderId } = state;

  return (
    <div className="mx-auto max-w-[640px] px-4 pb-20 pt-10 sm:px-6">
      <div className="rounded-2xl border border-line bg-white p-6 text-center sm:p-10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
          <CheckCircle2 size={40} strokeWidth={1.75} />
        </span>
        <h1 className="mt-4 text-2xl font-extrabold text-ink">Order placed!</h1>
        <p className="mt-2 text-sm text-ink-light">
          Your order from <span className="font-semibold text-ink">{restaurant.name}</span> has been confirmed.
        </p>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-light px-4 py-2 text-sm font-semibold text-brand">
          <Clock size={16} />
          Arriving in {eta} mins
        </div>

        <p className="mt-4 text-xs uppercase tracking-wide text-ink-faint">Order ID</p>
        <p className="text-sm font-semibold text-ink">{orderId}</p>
      </div>

      <div className="mt-6 rounded-2xl border border-line bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <SafeImage
            src={restaurant.image}
            fallbackSrc={foodImageFallback(restaurant.id, 200, 200)}
            alt={restaurant.name}
            className="h-12 w-12 rounded-lg object-cover"
          />
          <div>
            <h2 className="text-base font-bold text-ink">{restaurant.name}</h2>
            <p className="flex items-center gap-1 text-xs text-ink-light">
              <MapPin size={12} />
              {restaurant.location}
            </p>
          </div>
        </div>

        <div className="mt-4 divide-y divide-line border-t border-line">
          {lines.map((line) => (
            <div key={line.item.id} className="flex items-center justify-between py-3 text-sm">
              <span className="text-ink-light">
                <span className="font-semibold text-ink">{line.quantity}×</span> {line.item.name}
              </span>
              <span className="font-medium text-ink">{formatRupees(line.item.price * line.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-dashed border-line pt-3">
          <span className="text-base font-bold text-ink">Total Paid</span>
          <span className="text-base font-bold text-ink">{formatRupees(total)}</span>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-ink-faint">
        This is a demo confirmation screen — no real payment was processed.
      </p>

      <Link to="/" className="mt-3 block">
        <Button className="w-full">Back to home</Button>
      </Link>
    </div>
  );
}
