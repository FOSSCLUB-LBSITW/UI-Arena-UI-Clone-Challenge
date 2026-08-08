import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import type { Restaurant } from '../../types';
import SafeImage from '../common/SafeImage';
import { foodImageFallback } from '../../utils/images';

interface Props {
  restaurant: Restaurant;
  className?: string;
}

export default function RestaurantCard({ restaurant, className = '' }: Props) {
  return (
    <Link
      to={`/restaurant/${restaurant.id}`}
      className={`group block shrink-0 cursor-pointer focus:outline-none ${className}`}
    >
      <div className="overflow-hidden rounded-2xl">
        <div className="relative aspect-[4/3] overflow-hidden">
          <SafeImage
            src={restaurant.image}
            fallbackSrc={foodImageFallback(restaurant.id, 600, 400)}
            alt={restaurant.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {restaurant.discount && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2.5">
              <span className="text-sm font-bold text-white">{restaurant.discount}</span>
            </div>
          )}
        </div>
      </div>
      <div className="pt-2.5">
        <h3 className="truncate text-[16px] font-semibold text-ink">{restaurant.name}</h3>
        <div className="mt-1 flex items-center gap-1.5 text-sm text-ink-light">
          <span className="flex items-center gap-0.5 font-medium text-success">
            <Star size={13} fill="currentColor" strokeWidth={0} />
            {restaurant.rating}
          </span>
          <span>·</span>
          <span>{restaurant.deliveryTime}</span>
        </div>
        <p className="mt-0.5 truncate text-sm text-ink-light">{restaurant.cuisines.join(', ')}</p>
        <p className="truncate text-sm text-ink-faint">{restaurant.location}</p>
      </div>
    </Link>
  );
}
