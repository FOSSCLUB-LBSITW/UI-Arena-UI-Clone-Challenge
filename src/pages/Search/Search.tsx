import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchResults from '../../components/SearchResults/SearchResults';
import { restaurants } from '../../data/restaurants';
import { menuItems } from '../../data/menu';
import { categories } from '../../data/categories';
import SafeImage from '../../components/common/SafeImage';
import { foodImageFallback } from '../../utils/images';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');

  // Keep the URL in sync so category links (and browser back/forward) work.
  useEffect(() => {
    setSearchParams(query.trim() ? { q: query } : {}, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // If the user arrives via a new link (e.g. clicking another category
  // while already on the search page), pick up the new ?q= value.
  useEffect(() => {
    const q = searchParams.get('q') ?? '';
    setQuery((current) => (current === q ? current : q));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get('q')]);

  const filteredRestaurants = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return restaurants.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.cuisines.some((c) => c.toLowerCase().includes(q)) ||
        r.location.toLowerCase().includes(q)
    );
  }, [query]);

  const filteredMenuItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return menuItems
      .filter((i) => i.name.toLowerCase().includes(q))
      .map((i) => ({
        ...i,
        restaurantName: restaurants.find((r) => r.id === i.restaurantId)?.name ?? '',
      }));
  }, [query]);

  return (
    <div className="mx-auto max-w-[700px] px-4 pb-20 pt-8 sm:px-6">
      <SearchBar value={query} onChange={setQuery} />

      {query.trim().length === 0 && (
        <div className="mt-8 animate-fade-in">
          <h2 className="text-lg font-bold text-ink">Popular Cuisines</h2>
          <div className="no-scrollbar mt-4 flex gap-6 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setQuery(cat.name)}
                className="group flex shrink-0 flex-col items-center gap-2"
              >
                <span className="h-16 w-16 overflow-hidden rounded-full ring-1 ring-line transition group-hover:ring-brand">
                  <SafeImage
                    src={cat.image}
                    fallbackSrc={foodImageFallback(cat.id, 200, 200)}
                    alt={cat.name}
                    className="h-full w-full object-cover"
                  />
                </span>
                <span className="text-sm font-medium text-ink-light group-hover:text-ink">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <SearchResults query={query} restaurants={filteredRestaurants} menuItems={filteredMenuItems} />
    </div>
  );
}
