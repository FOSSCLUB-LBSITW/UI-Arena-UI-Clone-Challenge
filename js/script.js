// --- Sign-in drawer ---

const signinBtn = document.getElementById('signin-btn');
const drawer = document.getElementById('signin-drawer');
const overlay = document.getElementById('drawer-overlay');

if (signinBtn && drawer && overlay) {
  signinBtn.addEventListener('click', () => {
    drawer.classList.add('open');
    overlay.classList.add('open');
  });

  overlay.addEventListener('click', () => {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
  });
}

// --- Shared restaurant data ---

const restaurants = [
  { name: "Punjabi Tadka", cuisine: "North Indian, Chinese", rating: "4.3", time: "30 mins", img: "assets/images/restaurant1.jpg",
    items: ["Paneer Butter Masala", "Butter Chicken", "Dal Makhani", "Chole Bhature", "Veg Fried Rice"] },
  { name: "Sagar Ratna", cuisine: "South Indian, Dosa", rating: "4.1", time: "25 mins", img: "assets/images/restaurant2.jpg",
    items: ["Masala Dosa", "Idli Sambar", "Uttapam", "Vada", "Filter Coffee"] },
  { name: "Pizza Junction", cuisine: "Italian, Pizza, Fast Food", rating: "4.5", time: "35 mins", img: "assets/images/restaurant3.jpg",
    items: ["Margherita Pizza", "Pepperoni Pizza", "Garlic Bread", "Pasta Alfredo", "Cheesy Fries"] },
  { name: "Biryani House", cuisine: "Biryani, Mughlai", rating: "4.2", time: "40 mins", img: "assets/images/restaurant4.jpg",
    items: ["Chicken Biryani", "Mutton Biryani", "Veg Biryani", "Kebab Platter", "Raita"] },
  { name: "Sweet Corner", cuisine: "Desserts, Bakery", rating: "4.6", time: "20 mins", img: "assets/images/restaurant5.jpg",
    items: ["Gulab Jamun", "Rasmalai", "Chocolate Cake", "Brownie", "Ice Cream"] }
];

// --- Search page ---

function renderResults(list) {
  const resultsDiv = document.getElementById('search-results');
  if (!resultsDiv) return; // not on search.html, skip

  if (list.length === 0) {
    resultsDiv.innerHTML = '<p>No restaurants found.</p>';
    return;
  }

  resultsDiv.innerHTML = list.map(r => `
    <a href="restaurant.html" class="restaurant-card">
      <img src="${r.img}" alt="${r.name}">
      <div class="card-info">
        <h3>${r.name}</h3>
        <p class="rating">⭐ ${r.rating} · ${r.time}</p>
        <p class="cuisine">${r.cuisine}</p>
      </div>
    </a>
  `).join('');
}

const searchInput = document.getElementById('search-input');

if (searchInput) {
  renderResults(restaurants); // show all restaurants initially

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filtered = restaurants.filter(r =>
      r.name.toLowerCase().includes(query) ||
      r.cuisine.toLowerCase().includes(query) ||
      r.items.some(item => item.toLowerCase().includes(query))
    );
    renderResults(filtered);
  });
}

// --- Cart logic ---

function getCart() {
  const cart = localStorage.getItem('swiggyCart');
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem('swiggyCart', JSON.stringify(cart));
}

function addToCart(name, price) {
  const cart = getCart();
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  saveCart(cart);
  alert(name + " added to cart!");
}

document.querySelectorAll('.add-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);
    addToCart(name, price);
  });
});

// --- Render cart page ---

function renderCart() {
  const cartItemsDiv = document.getElementById('cart-items');
  const cartTotalP = document.getElementById('cart-total');

  if (!cartItemsDiv) return; // not on cart.html, skip

  const cart = getCart();

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    cartTotalP.textContent = '';
    return;
  }

  let total = 0;
  cartItemsDiv.innerHTML = cart.map(item => {
    total += item.price * item.qty;
    return `
      <div class="cart-item">
        <span>${item.name} x ${item.qty}</span>
        <span>₹${item.price * item.qty}</span>
      </div>
    `;
  }).join('');

  cartTotalP.textContent = `Total: ₹${total}`;
}

renderCart();