export const ON_YOUR_MIND = [
  { id: "c1", label: "Pothichoru", image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=200&q=80" },
  { id: "c2", label: "Dosa", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=200&q=80" },
  { id: "c3", label: "Idli", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=200&q=80" },
  { id: "c4", label: "Vada", image: "https://images.unsplash.com/photo-1728508707623-56d3dca51187?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: "c5", label: "Poori", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200&q=80" },
  { id: "c6", label: "Appam", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=200&q=80" },
  { id: "c7", label: "Biryani", image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=200&q=80" },
  { id: "c8", label: "Pizza", image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=200&q=80" },
  { id: "c9", label: "Burger", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&q=80" },
  { id: "c10", label: "Cake", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=200&q=80" }
];

export const POPULAR_CUISINES = [
  { id: "pc1", label: "Rolls", image: "https://images.unsplash.com/photo-1679310290259-78d9eaa32700?w=200&q=80" },
  { id: "pc2", label: "Tea", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200&q=80" },
  { id: "pc3", label: "Cake", image: "https://images.unsplash.com/photo-1586985289906-406988974504?w=200&q=80" },
  { id: "pc4", label: "Dessert", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&q=80" },
  { id: "pc5", label: "Sandwich", image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=200&q=80" },
  { id: "pc6", label: "Biryani", image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=200&q=80" },
  { id: "pc7", label: "Pizza", image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=200&q=80" },
  { id: "pc8", label: "Burger", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&q=80" }
];

export const RESTAURANTS = [
  {
    id: "r1",
    name: "Punjabi Tadka",
    cuisines: "North Indian, Punjabi, Tandoor",
    rating: 4.3,
    time: "28 mins",
    cost: 350,
    offer: "50% OFF up to ₹100",
    topChain: true,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80",
    menu: [
      { id: "m1", name: "Butter Chicken", price: 320, desc: "Tender chicken in creamy tomato gravy", veg: false, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&q=80" },
      { id: "m2", name: "Paneer Tikka Masala", price: 260, desc: "Grilled paneer in spiced onion gravy", veg: true, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&q=80" },
      { id: "m3", name: "Dal Makhani", price: 220, desc: "Slow cooked black lentils with butter", veg: true, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&q=80" },
      { id: "m4", name: "Tandoori Roti", price: 40, desc: "Whole wheat bread from the clay oven", veg: true, image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=300&q=80" },
      { id: "m5", name: "Chicken Biryani", price: 280, desc: "Basmati rice layered with spiced chicken", veg: false, image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=300&q=80" },
      { id: "m6", name: "Gulab Jamun", price: 90, desc: "Soft milk dumplings in sugar syrup", veg: true, image: "https://images.unsplash.com/photo-1666190092408-1988cd68482f?w=300&q=80" }
    ]
  },
  {
    id: "r2",
    name: "Domino's Pizza",
    cuisines: "Pizza, Italian, Fast Food",
    rating: 4.1,
    time: "22 mins",
    cost: 300,
    offer: "Buy 1 Get 1 Free",
    topChain: true,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80",
    menu: [
      { id: "m7", name: "Margherita Pizza", price: 199, desc: "Classic cheese and tomato pizza", veg: true, image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=300&q=80" },
      { id: "m8", name: "Farmhouse Pizza", price: 349, desc: "Loaded with onion, capsicum, tomato, mushroom", veg: true, image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=300&q=80" },
      { id: "m9", name: "Chicken Pepperoni", price: 399, desc: "Spicy pepperoni with extra cheese", veg: false, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&q=80" },
      { id: "m10", name: "Garlic Breadsticks", price: 129, desc: "Baked breadsticks with garlic butter", veg: true, image: "https://images.unsplash.com/photo-1619535860434-ba1d8fa32b56?w=300&q=80" },
      { id: "m11", name: "Choco Lava Cake", price: 99, desc: "Molten chocolate cake with a gooey center", veg: true, image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=300&q=80" }
    ]
  },
  {
    id: "r3",
    name: "Sushi Yama",
    cuisines: "Japanese, Sushi, Asian",
    rating: 4.5,
    time: "35 mins",
    cost: 600,
    offer: "20% OFF above ₹500",
    topChain: false,
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&q=80",
    menu: [
      { id: "m12", name: "California Roll", price: 320, desc: "Crab, avocado and cucumber roll", veg: false, image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=300&q=80" },
      { id: "m13", name: "Salmon Nigiri", price: 380, desc: "Fresh salmon over seasoned rice", veg: false, image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=300&q=80" },
      { id: "m14", name: "Vegetable Tempura", price: 260, desc: "Crispy battered seasonal vegetables", veg: true, image: "https://images.unsplash.com/photo-1615361200141-f45961bee148?w=300&q=80" },
      { id: "m15", name: "Miso Soup", price: 140, desc: "Traditional soybean paste soup", veg: true, image: "https://images.unsplash.com/photo-1607301405390-d831c242f59b?w=300&q=80" },
      { id: "m16", name: "Chicken Teriyaki", price: 420, desc: "Grilled chicken glazed with teriyaki sauce", veg: false, image: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=300&q=80" }
    ]
  },
  {
    id: "r4",
    name: "Burger Point",
    cuisines: "Burgers, American, Fast Food",
    rating: 4.0,
    time: "20 mins",
    cost: 250,
    offer: "Free delivery",
    topChain: true,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
    menu: [
      { id: "m17", name: "Classic Cheese Burger", price: 149, desc: "Beef patty with cheddar and pickles", veg: false, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&q=80" },
      { id: "m18", name: "Crispy Veg Burger", price: 119, desc: "Crispy veg patty with lettuce and mayo", veg: true, image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&q=80" },
      { id: "m19", name: "Loaded Fries", price: 129, desc: "Fries topped with cheese sauce and jalapenos", veg: true, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&q=80" },
      { id: "m20", name: "Chicken Wings", price: 220, desc: "Spicy grilled chicken wings, 6 pcs", veg: false, image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=300&q=80" },
      { id: "m21", name: "Chocolate Shake", price: 99, desc: "Thick chocolate milkshake", veg: true, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&q=80" }
    ]
  },
  {
    id: "r5",
    name: "South Spice",
    cuisines: "South Indian, Dosa, Idli",
    rating: 4.4,
    time: "25 mins",
    cost: 200,
    offer: "40% OFF up to ₹80",
    topChain: false,
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=600&q=80",
    menu: [
      { id: "m22", name: "Masala Dosa", price: 110, desc: "Crispy rice crepe with spiced potato filling", veg: true, image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=300&q=80" },
      { id: "m23", name: "Idli Sambar", price: 80, desc: "Steamed rice cakes with lentil soup", veg: true, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&q=80" },
      { id: "m24", name: "Medu Vada", price: 70, desc: "Crispy fried lentil doughnuts", veg: true, image: "https://images.unsplash.com/photo-1728508707623-56d3dca51187?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { id: "m25", name: "Filter Coffee", price: 50, desc: "South Indian style strong filter coffee", veg: true, image: "https://images.unsplash.com/photo-1610632380989-680fe40816c6?w=300&q=80" },
      { id: "m26", name: "Uttapam", price: 100, desc: "Thick pancake topped with onion and tomato", veg: true, image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=300&q=80" }
    ]
  },
  {
    id: "r6",
    name: "Sweet Treats",
    cuisines: "Desserts, Bakery, Ice Cream",
    rating: 4.6,
    time: "18 mins",
    cost: 180,
    offer: "Buy 2 Get 1 Free",
    topChain: false,
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80",
    menu: [
      { id: "m27", name: "Belgian Chocolate Cake", price: 150, desc: "Rich dark chocolate layered cake", veg: true, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&q=80" },
      { id: "m28", name: "Red Velvet Pastry", price: 90, desc: "Classic red velvet with cream cheese frosting", veg: true, image: "https://images.unsplash.com/photo-1586985289906-406988974504?w=300&q=80" },
      { id: "m29", name: "Vanilla Ice Cream Tub", price: 199, desc: "500ml classic vanilla bean ice cream", veg: true, image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=300&q=80" },
      { id: "m30", name: "Butter Croissant", price: 70, desc: "Flaky, buttery French pastry", veg: true, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&q=80" },
      { id: "m31", name: "Brownie with Ice Cream", price: 160, desc: "Warm fudge brownie with vanilla scoop", veg: true, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&q=80" }
    ]
  }
];

export function getRestaurantById(id) {
  return RESTAURANTS.find(r => r.id === id);
}

export function findMenuItem(itemId) {
  for (const r of RESTAURANTS) {
    const item = r.menu.find(m => m.id === itemId);
    if (item) return { restaurant: r, item };
  }
  return null;
}

export function getTopChains() {
  return RESTAURANTS.filter(r => r.topChain);
}

export const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="300" height="300" fill="%23f4f5f7"/><text x="50%" y="50%" font-size="90" text-anchor="middle" dominant-baseline="middle">🍽️</text></svg>'
  );

export function onImgError(e) {
  e.target.onerror = null;
  e.target.src = FALLBACK_IMAGE;
}
