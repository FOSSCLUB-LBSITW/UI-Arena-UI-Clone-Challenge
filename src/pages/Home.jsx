import { useRef } from "react";
import { RESTAURANTS, ON_YOUR_MIND, getTopChains, onImgError } from "../data";
import Footer from "../components/Footer";

function ScrollRow({ children }) {
  const trackRef = useRef(null);

  function scrollBy(amount) {
    if (trackRef.current) trackRef.current.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <div className="scroll-row-wrap">
      <div className="scroll-track" ref={trackRef}>
        {children}
      </div>
      <button className="scroll-arrow left" onClick={() => scrollBy(-320)}>←</button>
      <button className="scroll-arrow right" onClick={() => scrollBy(320)}>→</button>
    </div>
  );
}

export default function Home() {
  const topChains = getTopChains();

  return (
    <>
      <section className="section on-your-mind">
        <div className="section-head-row">
          <h2 className="section-title">What's on your mind?</h2>
        </div>
        <ScrollRow>
          {ON_YOUR_MIND.map(c => (
            <a className="mind-item" href="#/search" key={c.id}>
              <div className="mind-circle">
                <img src={c.image} alt={c.label} onError={onImgError} />
              </div>
              <div className="mind-label">{c.label}</div>
            </a>
          ))}
        </ScrollRow>
      </section>

      <section className="section">
        <div className="section-head-row">
          <h2 className="section-title">Top restaurant chains in Thiruvananthapuram</h2>
        </div>
        <ScrollRow>
          {topChains.map(r => (
            <a className="chain-card" href={`#/restaurant/${r.id}`} key={r.id}>
              <div className="img-wrap">
                <img src={r.image} alt={r.name} onError={onImgError} />
                <div className="offer-tag">🏷️ {r.offer}</div>
              </div>
              <div className="info">
                <h3>{r.name}</h3>
                <div className="rating-row">
                  <span className="rating-badge">★ {r.rating}</span>
                  <span>{r.time}</span>
                </div>
              </div>
            </a>
          ))}
        </ScrollRow>
      </section>

      <section className="section">
        <h2 className="section-title">Restaurants with online food delivery in Thiruvananthapuram</h2>
        <p className="section-sub">😋 {RESTAURANTS.length} restaurants to explore</p>
        <div className="filter-row">
          <div className="filter-chip active">🍽️ All</div>
          <div className="filter-chip">⭐ Rating 4.0+</div>
          <div className="filter-chip">🥦 Pure Veg</div>
          <div className="filter-chip">🏷️ Offers</div>
          <div className="filter-chip">⚡ Under 30 mins</div>
        </div>
        <div className="restaurant-grid">
          {RESTAURANTS.map(r => (
            <a className="restaurant-card" href={`#/restaurant/${r.id}`} key={r.id}>
              <div className="img-wrap">
                <img src={r.image} alt={r.name} onError={onImgError} />
                <div className="offer-tag">🏷️ {r.offer}</div>
              </div>
              <div className="info">
                <h3>{r.name}</h3>
                <div className="rating-row">
                  <span className="rating-badge">★ {r.rating}</span>
                  <span>⏱️ {r.time}</span>
                  <span>·</span>
                  <span>₹{r.cost} for two</span>
                </div>
                <div className="cuisines">{r.cuisines}</div>
              </div>
            </a>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
