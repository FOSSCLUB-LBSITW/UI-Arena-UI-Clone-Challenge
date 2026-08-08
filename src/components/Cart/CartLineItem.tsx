import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartLine } from '../../types';
import { formatRupees } from '../../utils/format';
import { useCart } from '../../hooks/useCart';

function VegBadge({ isVeg }: { isVeg: boolean }) {
  return (
    <span
      className={`mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm border ${
        isVeg ? 'border-veg' : 'border-nonveg'
      }`}
      aria-label={isVeg ? 'Vegetarian' : 'Non-vegetarian'}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${isVeg ? 'bg-veg' : 'bg-nonveg'}`} />
    </span>
  );
}

export default function CartLineItem({ line }: { line: CartLine }) {
  const { incrementItem, decrementItem, removeItem } = useCart();

  return (
    <div className="border-b border-line py-4 first:pt-0 last:border-b-0">
      <div className="flex items-start gap-2">
        <VegBadge isVeg={line.item.isVeg} />
        <h4 className="min-w-0 flex-1 text-sm font-semibold leading-snug text-ink">{line.item.name}</h4>
        <p className="shrink-0 text-sm font-semibold text-ink">
          {formatRupees(line.item.price * line.quantity)}
        </p>
      </div>

      <div className="mt-2 flex items-center justify-between pl-[22px]">
        {line.item.isCustomisable ? (
          <span className="text-xs font-medium text-ink-light">Customisable</span>
        ) : (
          <button
            onClick={() => removeItem(line.item.id)}
            aria-label={`Remove ${line.item.name}`}
            className="flex items-center gap-1 text-xs font-medium text-ink-faint hover:text-nonveg"
          >
            <Trash2 size={12} /> Remove
          </button>
        )}

        <div className="flex items-center gap-2 rounded-lg border border-line px-1 py-1">
          <button
            onClick={() => decrementItem(line.item.id)}
            aria-label="Decrease quantity"
            className="flex h-6 w-6 items-center justify-center rounded text-brand hover:bg-brand-light"
          >
            <Minus size={13} />
          </button>
          <span className="w-4 text-center text-sm font-bold text-ink">{line.quantity}</span>
          <button
            onClick={() => incrementItem(line.item.id)}
            aria-label="Increase quantity"
            className="flex h-6 w-6 items-center justify-center rounded text-brand hover:bg-brand-light"
          >
            <Plus size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
