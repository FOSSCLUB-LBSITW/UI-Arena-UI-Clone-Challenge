import React, { useState } from 'react';
import { useSwiggy } from '../context/SwiggyContext';
import { SlidersHorizontal, ChevronDown, Check, X } from 'lucide-react';

export const FilterSortBar: React.FC = () => {
  const {
    isPureVegFilter,
    setIsPureVegFilter,
    selectedCuisineFilter,
    setSelectedCuisineFilter,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery
  } = useSwiggy();

  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [fastDeliveryFilter, setFastDeliveryFilter] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(false);
  const [offersFilter, setOffersFilter] = useState(false);

  const sortOptions = [
    { label: 'Relevance (Default)', value: 'relevance' },
    { label: 'Delivery Time', value: 'deliveryTime' },
    { label: 'Rating: High to Low', value: 'rating' },
    { label: 'Cost: Low to High', value: 'costLow' },
    { label: 'Cost: High to Low', value: 'costHigh' }
  ];

  const hasActiveFilters =
    isPureVegFilter ||
    fastDeliveryFilter ||
    ratingFilter ||
    offersFilter ||
    selectedCuisineFilter !== null ||
    searchQuery !== '' ||
    sortBy !== 'relevance';

  const resetAllFilters = () => {
    setIsPureVegFilter(false);
    setFastDeliveryFilter(false);
    setRatingFilter(false);
    setOffersFilter(false);
    setSelectedCuisineFilter(null);
    setSearchQuery('');
    setSortBy('relevance');
  };

  return (
    <div className="py-4 border-b border-slate-200 flex items-center gap-3 overflow-x-auto no-scrollbar text-xs text-slate-700">
      
      {/* Sort Dropdown Button */}
      <div className="relative shrink-0">
        <button
          onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full border transition-all cursor-pointer ${
            sortBy !== 'relevance'
              ? 'border-slate-900 bg-slate-900 text-white font-bold shadow-xs'
              : 'border-slate-200 hover:border-slate-300 bg-white hover:shadow-xs font-medium'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Sort By</span>
          <ChevronDown className="w-3.5 h-3.5 opacity-70" />
        </button>

        {sortDropdownOpen && (
          <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 z-30 p-2 animate-fade-in">
            {sortOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => {
                  setSortBy(opt.value as any);
                  setSortDropdownOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left hover:bg-slate-50 transition-colors cursor-pointer text-xs ${
                  sortBy === opt.value ? 'text-[#FC8019] font-bold bg-orange-50/50' : 'text-slate-700 font-medium'
                }`}
              >
                <span>{opt.label}</span>
                {sortBy === opt.value && <Check className="w-4 h-4 text-[#FC8019]" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fast Delivery Pill */}
      <button
        onClick={() => setFastDeliveryFilter(!fastDeliveryFilter)}
        className={`px-4 py-2 rounded-full border shrink-0 transition-all cursor-pointer ${
          fastDeliveryFilter
            ? 'border-slate-900 bg-slate-900 text-white font-bold'
            : 'border-slate-200 hover:border-slate-300 bg-white hover:shadow-xs font-medium'
        }`}
      >
        Fast Delivery
      </button>

      {/* Rating 4.0+ Pill */}
      <button
        onClick={() => setRatingFilter(!ratingFilter)}
        className={`px-4 py-2 rounded-full border shrink-0 transition-all cursor-pointer ${
          ratingFilter
            ? 'border-slate-900 bg-slate-900 text-white font-bold'
            : 'border-slate-200 hover:border-slate-300 bg-white hover:shadow-xs font-medium'
        }`}
      >
        Ratings 4.0+
      </button>

      {/* Pure Veg Pill */}
      <button
        onClick={() => setIsPureVegFilter(!isPureVegFilter)}
        className={`px-4 py-2 rounded-full border shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
          isPureVegFilter
            ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold'
            : 'border-slate-200 hover:border-slate-300 bg-white hover:shadow-xs font-medium'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-[#60b246] inline-block" />
        Pure Veg
      </button>

      {/* Offers Pill */}
      <button
        onClick={() => setOffersFilter(!offersFilter)}
        className={`px-4 py-2 rounded-full border shrink-0 transition-all cursor-pointer ${
          offersFilter
            ? 'border-slate-900 bg-slate-900 text-white font-bold'
            : 'border-slate-200 hover:border-slate-300 bg-white hover:shadow-xs font-medium'
        }`}
      >
        Offers & Discounts
      </button>

      {/* Reset Filters */}
      {hasActiveFilters && (
        <button
          onClick={resetAllFilters}
          className="px-3 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold shrink-0 transition-colors cursor-pointer flex items-center gap-1"
        >
          <X className="w-3.5 h-3.5" />
          <span>Clear All</span>
        </button>
      )}

    </div>
  );
};
