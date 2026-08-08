import { useState } from 'react';
import { X } from 'lucide-react';
import type { MenuItem } from '../../types';
import { formatRupees } from '../../utils/format';

interface Props {
  item: MenuItem;
  onClose: () => void;
  onConfirm: () => void;
}

const ADD_ON = { name: 'Aquafina Water (1 Litre)', price: 14 };

export default function CustomiseModal({ item, onClose, onConfirm }: Props) {
  const [addOnSelected, setAddOnSelected] = useState(false);
  const total = item.price + (addOnSelected ? ADD_ON.price : 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 animate-fade-in" onClick={onClose}>
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-pop animate-pop-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-line px-5 py-4">
          <div>
            <p className="text-sm text-ink-light">
              {item.name} · {formatRupees(item.price)}
            </p>
            <h3 className="mt-0.5 text-lg font-bold text-ink">Customise as per your taste</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-light hover:bg-surface"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-5 py-4">
          <p className="text-sm font-semibold text-ink">{ADD_ON.name.split(' (')[0]} <span className="font-normal text-ink-light">(0/1)</span></p>
          <label className="mt-3 flex cursor-pointer items-center justify-between rounded-lg border border-line px-3 py-3 hover:border-ink-faint">
            <span className="text-sm text-ink">{ADD_ON.name}</span>
            <span className="flex items-center gap-3">
              <span className="text-sm font-medium text-ink">+ {formatRupees(ADD_ON.price)}</span>
              <input
                type="radio"
                checked={addOnSelected}
                onChange={() => setAddOnSelected((v) => !v)}
                className="h-4 w-4 accent-brand"
              />
            </span>
          </label>
        </div>

        <div className="flex items-center justify-between border-t border-line px-5 py-4">
          <span className="text-base font-bold text-ink">{formatRupees(total)}</span>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-success px-6 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
          >
            Add Item to cart
          </button>
        </div>
      </div>
    </div>
  );
}
