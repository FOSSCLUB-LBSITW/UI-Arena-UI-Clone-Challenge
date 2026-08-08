import { useState } from 'react';
import { Minus, Plus, Star } from 'lucide-react';
import type { MenuItem, Restaurant } from '../../types';
import { formatRupees } from '../../utils/format';
import { useCart } from '../../hooks/useCart';
import CustomiseModal from './CustomiseModal';
import SafeImage from '../common/SafeImage';
import { foodImageFallback } from '../../utils/images';

function VegBadge({ isVeg }: { isVeg: boolean }) {
  return (
    <span
      className={`flex h-4 w-4 items-center justify-center rounded-sm border ${
        isVeg ? 'border-veg' : 'border-nonveg'
      }`}
      aria-label={isVeg ? 'Vegetarian' : 'Non-vegetarian'}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${isVeg ? 'bg-veg' : 'bg-nonveg'}`} />
    </span>
  );
}

export default function MenuItemRow({ item, restaurant }: { item: MenuItem; restaurant: Restaurant }) {
  const { addItem, incrementItem, decrementItem, getQuantity } = useCart();
  const [showCustomise, setShowCustomise] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const quantity = getQuantity(item.id);

  const handleAdd = () => {
    if (item.isCustomisable) {
      setShowCustomise(true);
      return;
    }
    addItem(item, restaurant);
    triggerBump();
  };

  const triggerBump = () => {
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 350);
  };

  return (
    <>
      <div className="flex items-start justify-between gap-4 border-b border-line py-5">
        <div className="min-w-0 flex-1">
          <VegBadge isVeg={item.isVeg} />
          <h4 className="mt-2 text-[15px] font-semibold text-ink">{item.name}</h4>
          {item.rating && (
            <p className="mt-1 flex items-center gap-1 text-sm text-ink-light">
              <Star size={12} className="fill-success text-success" />
              <span className="font-medium">{item.rating}</span>
              <span className="text-ink-faint">({item.ratingCount})</span>
            </p>
          )}
          <p className="mt-1 text-[15px] font-medium text-ink">{formatRupees(item.price)}</p>
          <p className="mt-1.5 pr-2 text-sm text-ink-light">{item.description}</p>
        </div>

        <div className="flex w-32 shrink-0 flex-col items-center">
          <div className="relative w-full overflow-hidden rounded-xl">
            <SafeImage
              src={item.image}
              fallbackSrc={foodImageFallback(item.id, 300, 300)}
              alt={item.name}
              className="h-24 w-full object-cover"
            />
            {item.isBestseller && (
              <span className="absolute left-1.5 top-1.5 rounded bg-white/95 px-1.5 py-0.5 text-[10px] font-bold uppercase text-brand">
                Bestseller
              </span>
            )}
          </div>
          <div className="relative -mt-4 w-24">
            {quantity === 0 ? (
              <button
                onClick={handleAdd}
                className={`w-full rounded-lg border border-line bg-white py-2 text-sm font-bold text-brand shadow-card transition hover:bg-brand-light ${
                  justAdded ? 'animate-bump' : ''
                }`}
              >
                ADD
              </button>
            ) : (
              <div className="flex w-full items-center justify-between rounded-lg border border-line bg-white py-1.5 px-1 shadow-card animate-pop-in">
                <button
                  onClick={() => decrementItem(item.id)}
                  aria-label={`Decrease ${item.name} quantity`}
                  className="flex h-6 w-6 items-center justify-center rounded text-brand hover:bg-brand-light"
                >
                  <Minus size={14} />
                </button>
                <span className="text-sm font-bold text-ink">{quantity}</span>
                <button
                  onClick={() => (item.isCustomisable ? setShowCustomise(true) : incrementItem(item.id))}
                  aria-label={`Increase ${item.name} quantity`}
                  className="flex h-6 w-6 items-center justify-center rounded text-brand hover:bg-brand-light"
                >
                  <Plus size={14} />
                </button>
              </div>
            )}
            {item.isCustomisable && quantity === 0 && (
              <p className="mt-1 text-center text-[11px] text-ink-faint">Customisable</p>
            )}
          </div>
        </div>
      </div>

      {showCustomise && (
        <CustomiseModal
          item={item}
          onClose={() => setShowCustomise(false)}
          onConfirm={() => {
            addItem(item, restaurant);
            setShowCustomise(false);
            triggerBump();
          }}
        />
      )}
    </>
  );
}
