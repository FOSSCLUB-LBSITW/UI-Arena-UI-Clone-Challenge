import { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, Search, X } from 'lucide-react';
import type { MenuCategory, MenuItem, Restaurant } from '../../types';
import MenuItemRow from './MenuItemRow';

interface Props {
  restaurant: Restaurant;
  categories: MenuCategory[];
  items: MenuItem[];
}

type Filter = 'all' | 'veg' | 'nonveg' | 'bestseller';

export default function MenuList({ restaurant, categories, items }: Props) {
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(categories[0]?.id ?? null);
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');

  const itemsById = useMemo(() => new Map(items.map((i) => [i.id, i])), [items]);

  const matchesFilter = (item: MenuItem) => {
    if (filter === 'veg') return item.isVeg;
    if (filter === 'nonveg') return !item.isVeg;
    if (filter === 'bestseller') return !!item.isBestseller;
    return true;
  };

  const matchesQuery = (item: MenuItem) =>
    query.trim().length === 0 || item.name.toLowerCase().includes(query.trim().toLowerCase());

  const totalVisible = items.filter(matchesFilter).filter(matchesQuery).length;

  return (
    <div className="pb-20 pt-4 lg:pt-2">
      <div className="sticky top-16 z-20 -mx-4 bg-white px-4 pb-3 pt-1 sm:-mx-6 sm:px-6 lg:static lg:mx-0 lg:px-0">
        <div className="relative">
          <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search for dishes at ${restaurant.name}`}
            className="w-full rounded-lg border border-line bg-surface py-3 pl-11 pr-10 text-sm text-ink placeholder:text-ink-faint focus:border-ink-faint focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="no-scrollbar mt-3 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setFilter((prev) => (prev === 'veg' ? 'all' : 'veg'))}
            aria-pressed={filter === 'veg'}
            className={`flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
              filter === 'veg' ? 'border-veg bg-veg/10 text-veg' : 'border-line text-ink'
            }`}
          >
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-sm border border-veg">
              <span className="h-1.5 w-1.5 rounded-full bg-veg" />
            </span>
            Veg
          </button>
          <button
            onClick={() => setFilter((prev) => (prev === 'nonveg' ? 'all' : 'nonveg'))}
            aria-pressed={filter === 'nonveg'}
            className={`flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
              filter === 'nonveg' ? 'border-nonveg bg-nonveg/10 text-nonveg' : 'border-line text-ink'
            }`}
          >
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-sm border border-nonveg">
              <span className="h-1.5 w-1.5 rounded-full bg-nonveg" />
            </span>
            Non-Veg
          </button>
          <span className="h-5 w-px shrink-0 bg-line" />
          <button
            onClick={() => setFilter((prev) => (prev === 'bestseller' ? 'all' : 'bestseller'))}
            aria-pressed={filter === 'bestseller'}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
              filter === 'bestseller' ? 'border-brand bg-brand-light text-brand' : 'border-line text-ink'
            }`}
          >
            Bestseller
          </button>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between border-b border-line pb-3">
        <h2 className="text-lg font-bold text-ink">Menu</h2>
        <span className="text-sm text-ink-light">{totalVisible} items</span>
      </div>

      <div>
        {categories.map((category) => {
          const catItems = category.itemIds
            .map((id) => itemsById.get(id))
            .filter((i): i is MenuItem => !!i)
            .filter(matchesFilter)
            .filter(matchesQuery);

          if (catItems.length === 0) return null;
          const isOpen = openCategoryId === category.id;

          return (
            <div key={category.id} className="border-b border-line">
              <button
                onClick={() => setOpenCategoryId(isOpen ? null : category.id)}
                className="flex w-full items-center justify-between py-4 text-left"
              >
                <span className="text-base font-bold text-ink">
                  {category.name} <span className="font-normal text-ink-light">({catItems.length})</span>
                </span>
                {isOpen ? <ChevronUp size={18} className="text-ink-light" /> : <ChevronDown size={18} className="text-ink-light" />}
              </button>
              {isOpen && (
                <div className="animate-slide-up">
                  {catItems.map((item) => (
                    <MenuItemRow key={item.id} item={item} restaurant={restaurant} />
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {totalVisible === 0 && (
          <div className="flex flex-col items-center gap-2 py-16 text-center">
            <p className="text-base font-semibold text-ink">No dishes found</p>
            <p className="text-sm text-ink-light">Try a different search or filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
