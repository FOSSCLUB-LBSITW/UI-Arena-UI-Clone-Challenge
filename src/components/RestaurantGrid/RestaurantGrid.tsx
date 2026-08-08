import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import type { Restaurant } from '../../types';
import RestaurantCard from '../RestaurantCard/RestaurantCard';
import { parseCostForTwo, parseDeliveryMinutes } from '../../utils/format';

type SortOption = 'relevance' | 'rating' | 'deliveryTime' | 'costLowToHigh' | 'costHighToLow';

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: 'relevance', label: 'Relevance (Default)' },
  { id: 'deliveryTime', label: 'Delivery Time' },
  { id: 'rating', label: 'Rating' },
  { id: 'costLowToHigh', label: 'Cost: Low to High' },
  { id: 'costHighToLow', label: 'Cost: High to Low' },
];

export default function RestaurantGrid({ title, restaurants }: { title: string; restaurants: Restaurant[] }) {
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const sortedRestaurants = useMemo(() => {
    const list = [...restaurants];
    switch (sortBy) {
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'deliveryTime':
        return list.sort((a, b) => parseDeliveryMinutes(a.deliveryTime) - parseDeliveryMinutes(b.deliveryTime));
      case 'costLowToHigh':
        return list.sort((a, b) => parseCostForTwo(a.costForTwo) - parseCostForTwo(b.costForTwo));
      case 'costHighToLow':
        return list.sort((a, b) => parseCostForTwo(b.costForTwo) - parseCostForTwo(a.costForTwo));
      default:
        return list;
    }
  }, [restaurants, sortBy]);

  const activeLabel = SORT_OPTIONS.find((o) => o.id === sortBy)?.label ?? 'Sort By';

  return (
    <section className="mx-auto max-w-[1200px] px-4 pb-16 pt-8 sm:px-6">
      <h2 className="text-xl font-bold text-ink sm:text-2xl">{title}</h2>

      <div ref={containerRef} className="relative mt-4 inline-block">
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={`flex items-center gap-1 rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
            sortBy !== 'relevance'
              ? 'border-brand bg-brand-light text-brand'
              : 'border-line text-ink hover:border-ink-faint'
          }`}
        >
          {sortBy === 'relevance' ? 'Sort By' : activeLabel}
          <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <ul
            role="listbox"
            className="absolute left-0 top-full z-30 mt-2 w-56 overflow-hidden rounded-xl border border-line bg-white py-1.5 shadow-pop animate-fade-in"
          >
            {SORT_OPTIONS.map((option) => (
              <li key={option.id} role="option" aria-selected={sortBy === option.id}>
                <button
                  type="button"
                  onClick={() => {
                    setSortBy(option.id);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm font-medium transition hover:bg-surface ${
                    sortBy === option.id ? 'text-brand' : 'text-ink'
                  }`}
                >
                  {option.label}
                  {sortBy === option.id && <Check size={15} className="text-brand" />}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {sortedRestaurants.map((r) => (
          <RestaurantCard key={r.id} restaurant={r} />
        ))}
      </div>
    </section>
  );
}
