import { restaurants } from "../data/restaurants";
import RestaurantCard from "../components/RestaurantCard";

const cuisineFilters = ["Pizza", "North Indian", "Chinese", "South Indian", "Sushi", "Burgers"];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-swiggy-lightGray border-b border-swiggy-border">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
          <h1 className="text-3xl md:text-4xl font-extrabold text-swiggy-dark max-w-lg">
            Order food & groceries. Get it delivered to your door.
          </h1>
          <div className="mt-6 flex items-center bg-white border border-swiggy-border rounded-lg max-w-md h-12 px-4 shadow-sm">
            <LocationIcon />
            <input
              placeholder="Enter your delivery location"
              className="ml-2 flex-1 outline-none text-sm text-swiggy-dark"
            />
            <button className="text-swiggy-orange font-semibold text-sm">Locate me</button>
          </div>
        </div>
      </section>

      {/* Cuisine filter chips */}
      <section className="max-w-6xl mx-auto px-4 mt-6">
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
          {cuisineFilters.map((c) => (
            <button
              key={c}
              className="shrink-0 px-4 py-2 rounded-full border border-swiggy-border text-sm font-medium text-swiggy-dark hover:border-swiggy-orange hover:text-swiggy-orange transition-colors"
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Restaurant grid */}
      <section className="max-w-6xl mx-auto px-4 mt-8 pb-16">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-swiggy-dark">
            Restaurants to explore
          </h2>
          <span className="text-sm text-swiggy-gray">{restaurants.length} results</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
          {restaurants.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      </section>
    </div>
  );
}

function LocationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FC8019" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
