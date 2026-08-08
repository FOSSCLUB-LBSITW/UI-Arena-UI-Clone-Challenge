import { getRestaurantById, RESTAURANTS, onImgError } from "../data";
import { useCart } from "../CartContext";

export default function Restaurant({ id }) {
  const restaurant = getRestaurantById(id) || RESTAURANTS[0];
  const { cart, addToCart } = useCart();
  return (
    <>
      <div className="rest-header">
        <img src={restaurant.image} alt={restaurant.name} onError={onImgError} />
        <div>
          <h1>{restaurant.name}</h1>
          <div className="cuisines">{restaurant.cuisines}</div>
          <div className="rest-meta">
            <span className="meta-item"><span className="rating-badge">★ {restaurant.rating}</span></span>
            <span className="meta-item">⏱ {restaurant.time}</span>
            <span className="meta-item">₹{restaurant.cost} for two</span>
          </div>
          <div className="offer-strip">🏷 {restaurant.offer}</div>
        </div>
      </div>
      <div className="menu-wrap">
        <h2>Menu</h2>
        {restaurant.menu.map(item => {
          const qty = cart[item.id] || 0;
          return (
            <div className="menu-item" key={item.id}>
              <div className="menu-item-left">
                <div className={`veg-icon ${item.veg ? "" : "nonveg"}`}></div>
                <h3>{item.name}</h3>
                <div className="price">₹{item.price}</div>
                <div className="desc">{item.desc}</div>
              </div>
              <div className="menu-item-right">
                <div className="img-wrap">
                  <img src={item.image} alt={item.name} onError={onImgError} />
                  {qty > 0 ? (
                    <div className="qty-stepper">
                      <button onClick={() => addToCart(item.id, -1)}>-</button>
                      <span>{qty}</span>
                      <button onClick={() => addToCart(item.id, 1)}>+</button>
                    </div>
                  ) : (
                    <button className="add-btn" onClick={() => addToCart(item.id, 1)}>ADD</button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
