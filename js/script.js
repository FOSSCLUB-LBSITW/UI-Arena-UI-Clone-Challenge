// ================= Sign-in drawer =================

const signinBtn = document.getElementById('signin-btn');
const signinDrawer = document.getElementById('signin-drawer');
const signinOverlay = document.getElementById('signin-overlay');

if (signinBtn && signinDrawer && signinOverlay) {
  signinBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signinDrawer.classList.add('open');
    signinOverlay.classList.add('open');
  });
  signinOverlay.addEventListener('click', () => {
    signinDrawer.classList.remove('open');
    signinOverlay.classList.remove('open');
  });
}

// ================= Location panel =================

const locationToggle = document.getElementById('location-toggle');
const locationPanel = document.getElementById('location-panel');
const locationOverlay = document.getElementById('location-overlay');

if (locationToggle && locationPanel && locationOverlay) {
  locationToggle.addEventListener('click', () => {
    locationPanel.classList.add('open');
    locationOverlay.classList.add('open');
  });
  locationOverlay.addEventListener('click', () => {
    locationPanel.classList.remove('open');
    locationOverlay.classList.remove('open');
  });
}

const gpsBtn = document.getElementById('gps-btn');
if (gpsBtn) {
  gpsBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => alert('Location detected!'),
        () => alert('Unable to fetch location. Please allow location access.')
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  });
}

// ================= Cart core =================

function getCart() {
  const cart = localStorage.getItem('swiggyCart');
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem('swiggyCart', JSON.stringify(cart));
  updateCartCount();
}

function getQty(name) {
  const item = getCart().find(i => i.name === name);
  return item ? item.qty : 0;
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
  showToast();
}

function decrementCartItem(name) {
  let cart = getCart();
  const existing = cart.find(item => item.name === name);
  if (!existing) return 0;
  existing.qty -= 1;
  if (existing.qty <= 0) {
    cart = cart.filter(item => item.name !== name);
    saveCart(cart);
    return 0;
  }
  saveCart(cart);
  return existing.qty;
}

function updateCartCount() {
  const countEl = document.getElementById('cart-count');
  if (!countEl) return;
  const total = getCart().reduce((sum, i) => sum + i.qty, 0);
  countEl.textContent = total;
}

// ================= Toast =================

function showToast() {
  const toast = document.getElementById('cart-toast');
  if (!toast) return;
  const totalItems = getCart().reduce((sum, i) => sum + i.qty, 0);
  document.getElementById('toast-msg').textContent =
    `${totalItems} item${totalItems > 1 ? 's' : ''} added`;
  toast.classList.add('show');
  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}

// ================= Menu page (ADD <-> stepper) =================

function stepperHTML(name, price, qty) {
  return `<div class="qty-stepper" data-name="${name}" data-price="${price}">
    <button class="qty-btn qty-minus">−</button>
    <span class="qty-count">${qty}</span>
    <button class="qty-btn qty-plus">+</button>
  </div>`;
}

function addBtnHTML(name, price) {
  return `<button class="add-btn" data-name="${name}" data-price="${price}">ADD</button>`;
}

const menuList = document.querySelector('.menu-list');

if (menuList) {
  menuList.querySelectorAll('.add-btn').forEach(btn => {
    const name = btn.dataset.name;
    const price = btn.dataset.price;
    const qty = getQty(name);
    if (qty > 0) {
      btn.outerHTML = stepperHTML(name, price, qty);
    }
  });

  menuList.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-btn')) {
      const btn = e.target;
      const name = btn.dataset.name;
      const price = btn.dataset.price;
      addToCart(name, parseFloat(price));
      btn.outerHTML = stepperHTML(name, price, 1);
    } else if (e.target.classList.contains('qty-plus')) {
      const wrap = e.target.closest('.qty-stepper');
      const name = wrap.dataset.name;
      const price = wrap.dataset.price;
      addToCart(name, parseFloat(price));
      wrap.querySelector('.qty-count').textContent = getQty(name);
    } else if (e.target.classList.contains('qty-minus')) {
      const wrap = e.target.closest('.qty-stepper');
      const name = wrap.dataset.name;
      const price = wrap.dataset.price;
      const newQty = decrementCartItem(name);
      if (newQty <= 0) {
        wrap.outerHTML = addBtnHTML(name, price);
      } else {
        wrap.querySelector('.qty-count').textContent = newQty;
      }
    }
  });
}

// ================= Cart page render =================

function renderCart() {
  const cartItemsDiv = document.getElementById('cart-items');
  if (!cartItemsDiv) return;

  const itemTotalEl = document.getElementById('item-total');
  const toPayEl = document.getElementById('to-pay');
  const deliveryFee = 24;
  const cart = getCart();

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    document.querySelector('.bill-details').style.display = 'none';
    return;
  }

  document.querySelector('.bill-details').style.display = 'block';

  let itemTotal = 0;
  cartItemsDiv.innerHTML = cart.map(item => {
    itemTotal += item.price * item.qty;
    return `
      <div class="cart-item-row">
        <span class="cart-item-name">${item.name}</span>
        <div class="qty-stepper" data-name="${item.name}" data-price="${item.price}">
          <button class="qty-btn qty-minus">−</button>
          <span class="qty-count">${item.qty}</span>
          <button class="qty-btn qty-plus">+</button>
        </div>
        <span class="cart-item-price">₹${item.price * item.qty}</span>
      </div>
    `;
  }).join('');

  itemTotalEl.textContent = `₹${itemTotal}`;
  toPayEl.textContent = `₹${itemTotal + deliveryFee}`;

  cartItemsDiv.querySelectorAll('.qty-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const wrap = btn.closest('.qty-stepper');
      addToCart(wrap.dataset.name, parseFloat(wrap.dataset.price));
      renderCart();
    });
  });

  cartItemsDiv.querySelectorAll('.qty-minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const wrap = btn.closest('.qty-stepper');
      decrementCartItem(wrap.dataset.name);
      renderCart();
    });
  });
}

renderCart();
updateCartCount();

// ================= Search page =================

const cuisines = [
  { name: "Biryani", emoji: "🍛" },
  { name: "Pizza", emoji: "🍕" },
  { name: "Dosa", emoji: "🥞" },
  { name: "Desserts", emoji: "🍰" },
  { name: "North Indian", emoji: "🍲" }
];

const restaurants = [
  { name: "Punjabi Tadka", page: "restaurant.html", cuisine: "North Indian, Chinese", rating: "4.3", time: "30-35 mins", img: "assets/images/restaurant1.jpg",
    items: ["Paneer Butter Masala", "Butter Chicken", "Dal Makhani", "Chole Bhature", "Veg Fried Rice"] },
  { name: "Sagar Ratna", page: "restaurant2.html", cuisine: "South Indian, Dosa", rating: "4.1", time: "25-30 mins", img: "assets/images/restaurant2.jpg",
    items: ["Masala Dosa", "Idli Sambar", "Uttapam", "Vada", "Filter Coffee"] },
  { name: "Pizza Junction", page: "restaurant3.html", cuisine: "Italian, Pizza, Fast Food", rating: "4.5", time: "35-40 mins", img: "assets/images/restaurant3.jpg",
    items: ["Margherita Pizza", "Pepperoni Pizza", "Garlic Bread", "Pasta Alfredo", "Cheesy Fries"] },
  { name: "Biryani House", page: "restaurant4.html", cuisine: "Biryani, Mughlai", rating: "4.2", time: "40-45 mins", img: "assets/images/restaurant4.jpg",
    items: ["Chicken Biryani", "Mutton Biryani", "Veg Biryani", "Kebab Platter", "Raita"] },
  { name: "Sweet Corner", page: "restaurant5.html", cuisine: "Desserts, Bakery", rating: "4.6", time: "20-25 mins", img: "assets/images/restaurant5.jpg",
    items: ["Gulab Jamun", "Rasmalai", "Chocolate Cake", "Brownie", "Ice Cream"] }
];

function cardHTML(r) {
  return `
    <a href="${r.page}" class="restaurant-card">
      <div class="card-img-wrap">
        <img src="${r.img}" alt="${r.name}">
      </div>
      <div class="card-info">
        <h3>${r.name}</h3>
        <p class="rating"><span class="rating-badge">★</span>${r.rating} · ${r.time}</p>
        <p class="cuisine">${r.cuisine}</p>
      </div>
    </a>`;
}

function renderResults(list) {
  const resultsDiv = document.getElementById('search-results');
  const cuisineRow = document.getElementById('cuisine-row');
  if (!resultsDiv) return;

  if (list === null) {
    resultsDiv.innerHTML = '';
    if (cuisineRow) cuisineRow.style.display = 'flex';
    return;
  }

  if (cuisineRow) cuisineRow.style.display = 'none';

  if (list.length === 0) {
    resultsDiv.innerHTML = '<p>No restaurants found.</p>';
    return;
  }

  resultsDiv.innerHTML = `<div class="restaurant-grid">${list.map(cardHTML).join('')}</div>`;
}

const searchInput = document.getElementById('search-input');

if (searchInput) {
  const cuisineRow = document.getElementById('cuisine-row');
  if (cuisineRow) {
    cuisineRow.innerHTML = cuisines.map(c => `
      <div class="cuisine-item" data-query="${c.name.toLowerCase()}">
        <div class="cuisine-circle">${c.emoji}</div>
        <span>${c.name}</span>
      </div>
    `).join('');

    cuisineRow.querySelectorAll('.cuisine-item').forEach(item => {
      item.addEventListener('click', () => {
        searchInput.value = item.dataset.query;
        searchInput.dispatchEvent(new Event('input'));
      });
    });
  }

  renderResults(null);

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    if (query === '') {
      renderResults(null);
      return;
    }
    const filtered = restaurants.filter(r =>
      r.name.toLowerCase().includes(query) ||
      r.cuisine.toLowerCase().includes(query) ||
      r.items.some(item => item.toLowerCase().includes(query))
    );
    renderResults(filtered);
  });
}

// ================= Home page cuisine strip scroll =================

const cuisineStrip = document.getElementById('cuisine-strip');
const scrollLeftBtn = document.getElementById('scroll-left');
const scrollRightBtn = document.getElementById('scroll-right');

if (cuisineStrip && scrollLeftBtn && scrollRightBtn) {
  scrollLeftBtn.addEventListener('click', () => {
    cuisineStrip.scrollBy({ left: -300, behavior: 'smooth' });
  });
  scrollRightBtn.addEventListener('click', () => {
    cuisineStrip.scrollBy({ left: 300, behavior: 'smooth' });
  });
}