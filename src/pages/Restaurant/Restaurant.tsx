import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronRight, Star, Clock, MapPin } from 'lucide-react';
import { restaurants } from '../../data/restaurants';
import { menuCategories, menuItems } from '../../data/menu';
import MenuList from '../../components/MenuItem/MenuList';
import CartBar from '../../components/CartDrawer/CartBar';
import SafeImage from '../../components/common/SafeImage';
import { foodImageFallback } from '../../utils/images';

export default function Restaurant() {
  const { id } = useParams<{ id: string }>();
  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) return <Navigate to="/" replace />;

  const categories = menuCategories[restaurant.id] ?? [];
  const items = menuItems.filter((i) => i.restaurantId === restaurant.id);

  return (
    <div className="pb-16">
      <div className="mx-auto max-w-[1200px] px-4 pt-5 sm:px-6">
        <nav className="flex items-center gap-1.5 text-xs text-ink-light">
          <Link to="/" className="hover:text-ink">
            Home
          </Link>
          <ChevronRight size={12} />
          <span>Thiruvananthapuram</span>
          <ChevronRight size={12} />
          <span className="text-ink">{restaurant.name}</span>
        </nav>

        <div className="mt-4 flex flex-col gap-8 lg:flex-row lg:items-start">
          <aside className="shrink-0 lg:sticky lg:top-20 lg:w-[300px]">
            <div className="overflow-hidden rounded-2xl">
              <SafeImage
                src={restaurant.image}
                fallbackSrc={foodImageFallback(restaurant.id, 600, 400)}
                alt={restaurant.name}
                className="h-48 w-full object-cover lg:h-44"
              />
            </div>

            <h1 className="mt-4 text-2xl font-extrabold text-ink">{restaurant.name}</h1>
            <p className="mt-1.5 text-sm font-medium text-ink-light">{restaurant.cuisines.join(', ')}</p>
            <p className="mt-1 flex items-start gap-1.5 text-sm text-ink-light">
              <MapPin size={14} className="mt-0.5 shrink-0" />
              {restaurant.location}
            </p>

            <div className="mt-4 flex items-center justify-between rounded-xl border border-line px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 rounded bg-success px-1.5 py-0.5 text-xs font-bold text-white">
                  <Star size={11} fill="currentColor" strokeWidth={0} />
                  {restaurant.rating}
                </span>
                <span className="text-xs text-ink-light">{restaurant.ratingCount} ratings</span>
              </div>
              <span className="h-6 w-px bg-line" />
              <div className="flex items-center gap-1.5 text-sm font-medium text-ink">
                <Clock size={14} className="text-ink-light" />
                {restaurant.deliveryTime}
              </div>
            </div>

            <p className="mt-3 flex items-center gap-1.5 text-sm">
              <span className="font-medium text-success">{restaurant.isOpen ? 'Open now' : 'Closed'}</span>
              <span className="text-ink-faint">· Closes {restaurant.closesAt}</span>
              <span className="text-ink-faint">· {restaurant.costForTwo}</span>
            </p>

            <p className="mt-3 text-sm leading-relaxed text-ink-light">{restaurant.description}</p>
          </aside>

          <div className="min-w-0 flex-1 border-t border-line pt-2 lg:border-t-0 lg:pt-0">
            <MenuList restaurant={restaurant} categories={categories} items={items} />
          </div>
        </div>
      </div>

      <CartBar />
    </div>
  );
}
