import { Link } from 'react-router-dom';
import { SearchX, Star } from 'lucide-react';
import type { MenuItem, Restaurant } from '../../types';
import { formatRupees } from '../../utils/format';
import RestaurantCard from '../RestaurantCard/RestaurantCard';
import SafeImage from '../common/SafeImage';
import { foodImageFallback } from '../../utils/images';

interface Props {
  query: string;
  restaurants: Restaurant[];
  menuItems: (MenuItem & { restaurantName: string })[];
}

export default function SearchResults({ query, restaurants, menuItems }: Props) {
  const hasResults = restaurants.length > 0 || menuItems.length > 0;

  if (query.trim().length === 0) return null;

  if (!hasResults) {
    return (
      <div className="flex flex-col items-center gap-3 py-20 text-center animate-fade-in">
        <SearchX size={40} className="text-ink-faint" />
        <p className="text-lg font-semibold text-ink">No results for "{query}"</p>
        <p className="text-sm text-ink-light">Try searching for a different restaurant or dish</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {restaurants.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-bold text-ink">Restaurants</h2>
          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {restaurants.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        </section>
      )}

      {menuItems.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-bold text-ink">Dishes</h2>
          <div className="mt-4 divide-y divide-line">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={`/restaurant/${item.restaurantId}`}
                className="flex items-center gap-4 py-4 hover:bg-surface"
              >
                <SafeImage
                  src={item.image}
                  fallbackSrc={foodImageFallback(item.id, 300, 300)}
                  alt={item.name}
                  className="h-16 w-16 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-sm font-semibold text-ink">{item.name}</h4>
                  <p className="truncate text-sm text-ink-light">{item.restaurantName}</p>
                  <div className="mt-1 flex items-center gap-2 text-sm">
                    <span className="font-medium text-ink">{formatRupees(item.price)}</span>
                    {item.rating && (
                      <span className="flex items-center gap-0.5 text-success">
                        <Star size={12} fill="currentColor" strokeWidth={0} />
                        {item.rating}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
