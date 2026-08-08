import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { FoodCategory } from '../../types';
import SafeImage from '../common/SafeImage';
import { foodImageFallback } from '../../utils/images';

export default function FoodCategoryRow({ categories }: { categories: FoodCategory[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollBy = (dir: number) => {
    scrollerRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  return (
    <section className="mx-auto max-w-[1200px] px-4 pt-6 sm:px-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-ink sm:text-2xl">What's on your mind?</h2>
        <div className="hidden gap-2 sm:flex">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Scroll categories left"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-light transition hover:border-ink-faint hover:text-ink"
          >
            <ArrowLeft size={15} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Scroll categories right"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-light transition hover:border-ink-faint hover:text-ink"
          >
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
      <div ref={scrollerRef} className="no-scrollbar flex gap-6 overflow-x-auto scroll-smooth pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => navigate(`/search?q=${encodeURIComponent(cat.name)}`)}
            className="group flex shrink-0 flex-col items-center gap-2 focus:outline-none"
            type="button"
          >
            <span className="h-20 w-20 overflow-hidden rounded-full ring-1 ring-line transition-transform duration-200 group-hover:scale-105 group-hover:ring-brand sm:h-24 sm:w-24">
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
    </section>
  );
}
