import { useState } from 'react';
import { Check, Copy, CreditCard, Percent, Tag, Ticket, Truck, Wallet } from 'lucide-react';
import type { Offer } from '../../data/offers';
import SafeImage from '../common/SafeImage';
import { foodImageFallback } from '../../utils/images';

const icons = {
  percent: Percent,
  truck: Truck,
  tag: Tag,
  'credit-card': CreditCard,
  wallet: Wallet,
};

export default function OfferCard({ offer }: { offer: Offer }) {
  const [copied, setCopied] = useState(false);
  const Icon = icons[offer.icon];

  const handleCopy = async () => {
    if (!offer.code) return;
    try {
      await navigator.clipboard.writeText(offer.code);
    } catch {
      // Clipboard API may be unavailable; the code is still visible on the card.
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-pop">
      <div className="relative aspect-[5/3] overflow-hidden">
        {offer.image ? (
          <SafeImage
            src={offer.image}
            fallbackSrc={foodImageFallback(offer.id, 400, 240)}
            alt={offer.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className={`flex h-full w-full items-center justify-center ${offer.accent} transition-transform duration-300 group-hover:scale-105`}>
            <Icon size={44} className="text-white/90" strokeWidth={1.5} />
          </div>
        )}
        <span className={`absolute left-3 top-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white ${offer.accent} ${offer.image ? '' : 'bg-black/25'}`}>
          <Ticket size={12} />
          {offer.category === 'bank' ? 'Bank offer' : offer.category === 'restaurant' ? 'Restaurant offer' : 'Coupon'}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-[15px] font-bold leading-snug text-ink">{offer.title}</h3>
        <p className="mt-1 text-sm text-ink-light">{offer.subtitle}</p>

        {offer.code && (
          <button
            onClick={handleCopy}
            className="mt-3.5 flex w-full items-center justify-between rounded-lg border border-dashed border-brand bg-brand-light px-3 py-2.5 text-left transition hover:bg-brand/10"
          >
            <span className="text-sm font-bold tracking-wide text-brand">{offer.code}</span>
            <span className="flex items-center gap-1 text-xs font-semibold text-brand">
              {copied ? (
                <>
                  <Check size={13} /> Copied
                </>
              ) : (
                <>
                  <Copy size={13} /> Copy
                </>
              )}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
