import React from 'react';
import { FOOD_CATEGORIES } from '../data/mockData';
import { useSwiggy } from '../context/SwiggyContext';

export const FoodCategories: React.FC = () => {
  const { setSelectedCuisineFilter, setSearchQuery, setActivePage } = useSwiggy();

  const handleCategoryClick = (keyword: string) => {
    setSelectedCuisineFilter(keyword);
    setSearchQuery(keyword);
    setActivePage('home');
  };

  return (
    <div className="py-6 border-b border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          What's on your mind?
        </h2>
      </div>

      {/* Horizontal Scrollable Categories */}
      <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-3 scroll-smooth">
        {FOOD_CATEGORIES.map(category => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.searchKeyword)}
            className="flex flex-col items-center gap-2 group cursor-pointer shrink-0 transition-transform hover:scale-105"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-slate-100 border-2 border-transparent group-hover:border-orange-500 shadow-xs transition-all">
              <img
                src={category.imageUrl}
                alt={category.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-700 group-hover:text-orange-600 transition-colors text-center truncate max-w-[84px]">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
