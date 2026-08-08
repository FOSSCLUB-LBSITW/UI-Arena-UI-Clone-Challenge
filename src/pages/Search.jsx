import { useState, useMemo } from "react";
import { restaurants } from "../data/restaurants";
import RestaurantCard from "../components/RestaurantCard";

export default function Search() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return restaurants.filter((r) => {
      const inName = r.name.toLowerCase().includes(q);
      const inCuisine = r.cuisines.some((c) => c.toLowerCase().includes(q));
      const inMenu = r.menu.some((m) => m.name.toLowerCase().includes(q));
      return inName || inCuisine || inMenu;
    });
  }, [query]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-16">
      <div className="flex items-center bg-swiggy-lightGray border border-swiggy-border rounded-lg h-12 px-4">
        <SearchIcon />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for restaurant, cuisine, or a dish"
          className="ml-3 flex-1 bg-transparent outline-none text-sm text-swiggy-dark"
        />
        {query && (
          <button onClick={() => setQuery("")} className="text-swiggy-gray text-lg">
            &times;
          </button>
        )}
      </div>

      {!query && (
        <p className="text-swiggy-gray text-sm mt-6">
          Try "pizza", "biryani", or a restaurant name
        </p>
      )}

      {query && results.length === 0 && (
        <p className="text-swiggy-gray text-sm mt-6">
          No results found for "{query}"
        </p>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {results.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      )}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#686B78" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}
