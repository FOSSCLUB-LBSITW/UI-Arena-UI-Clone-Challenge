import { useState, useMemo } from "react";
import { RESTAURANTS, POPULAR_CUISINES, onImgError } from "../data";

function buildIndex() {
  const list = [];
  RESTAURANTS.forEach(r => {
    list.push({ type: "restaurant", id: r.id, name: r.name, meta: r.cuisines, image: r.image, restaurantId: r.id });
    r.menu.forEach(item => {
      list.push({ type: "dish", id: item.id, name: item.name, meta: "at " + r.name, image: item.image, restaurantId: r.id });
    });
  });
  return list;
}

const searchIndex = buildIndex();
const RECENT_SEARCHES = ["Biryani", "Dosa", "Pizza", "Momos"];

export default function Search() {
  const [query, setQuery] = useState("");

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return searchIndex.filter(r => r.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="search-page-wrap">
      <div className="search-input-row">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input
          type="text"
          placeholder="Search for restaurants and food"
          autoFocus
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {query && <button className="search-clear" onClick={() => setQuery("")}>✕</button>}
      </div>

      {matches === null && (
        <>
          {RECENT_SEARCHES.length > 0 && (
            <div className="search-chip-section">
              <h3>🕑 Recent searches</h3>
              <div className="filter-row">
                {RECENT_SEARCHES.map(s => (
                  <div className="filter-chip" key={s} onClick={() => setQuery(s)}>{s}</div>
                ))}
              </div>
            </div>
          )}

          <div className="search-chip-section">
            <h3>🍱 Popular Cuisines</h3>
            <div className="popular-cuisine-grid">
              {POPULAR_CUISINES.map(c => (
                <button className="mind-item" key={c.id} onClick={() => setQuery(c.label)}>
                  <div className="mind-circle small">
                    <img src={c.image} alt={c.label} onError={onImgError} />
                  </div>
                  <div className="mind-label">{c.label}</div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {matches !== null && (
        <>
          <div className="search-results-count">{matches.length} results found</div>
          {matches.length === 0 ? (
            <div className="empty-state">
              <div style={{ fontSize: 50 }}>🔍</div>
              <h2>No results for "{query}"</h2>
              <p>Try searching for something else</p>
            </div>
          ) : (
            matches.map(m => (
              <a className="search-result-item" href={`#/restaurant/${m.restaurantId}`} key={m.type + m.id}>
                <img src={m.image} alt={m.name} onError={onImgError} />
                <div>
                  <h4>{m.name}</h4>
                  <div className="meta">{m.meta}</div>
                  <span className="tag">{m.type === "restaurant" ? "🏬 Restaurant" : "🍴 Dish"}</span>
                </div>
              </a>
            ))
          )}
        </>
      )}
    </div>
  );
}
