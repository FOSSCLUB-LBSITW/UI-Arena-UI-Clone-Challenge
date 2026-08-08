import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Restaurant } from '../../types';
import RestaurantCard from '../RestaurantCard/RestaurantCard';

export default function RestaurantRow({ title, restaurants }: { title: string; restaurants: Restaurant[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    scrollerRef.current?.scrollBy({ left: dir * 300, behavior: 'smooth' });
  };

  return (
    <section className="mx-auto max-w-[1200px] px-4 pt-8 sm:px-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-ink sm:text-2xl">{title}</h2>
        <div className="hidden gap-2 sm:flex">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Scroll left"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-light transition hover:border-ink-faint hover:text-ink"
          >
            <ArrowLeft size={15} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Scroll right"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-light transition hover:border-ink-faint hover:text-ink"
          >
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
      <div ref={scrollerRef} className="no-scrollbar flex gap-5 overflow-x-auto scroll-smooth pb-2">
        {restaurants.map((r) => (
          <RestaurantCard key={r.id} restaurant={r} className="w-[220px] sm:w-[248px]" />
        ))}
      </div>
    </section>
  );
}
