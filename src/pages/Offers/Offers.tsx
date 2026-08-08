import { useMemo, useState } from 'react';
import { Tag } from 'lucide-react';
import { offers } from '../../data/offers';
import OfferCard from '../../components/OfferCard/OfferCard';

type FilterId = 'all' | 'coupon' | 'restaurant' | 'bank';

const filters: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All Offers' },
  { id: 'coupon', label: 'Coupons' },
  { id: 'restaurant', label: 'Restaurant Offers' },
  { id: 'bank', label: 'Bank Offers' },
];

export default function Offers() {
  const [filter, setFilter] = useState<FilterId>('all');

  const visibleOffers = useMemo(
    () => (filter === 'all' ? offers : offers.filter((o) => o.category === filter)),
    [filter]
  );

  return (
    <div className="pb-20">
      <div className="bg-gradient-to-r from-brand to-brand-dark px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-[1100px]">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white">
            <Tag size={22} />
          </span>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">Offers &amp; Coupons</h1>
          <p className="mt-2 max-w-md text-sm text-white/85 sm:text-base">
            Save more on every order with restaurant deals, coupon codes and bank offers.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
        <div className="no-scrollbar -mt-6 flex gap-2 overflow-x-auto rounded-2xl bg-white p-2 shadow-pop">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                filter === f.id ? 'bg-brand text-white' : 'text-ink-light hover:bg-surface hover:text-ink'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </div>
    </div>
  );
}
