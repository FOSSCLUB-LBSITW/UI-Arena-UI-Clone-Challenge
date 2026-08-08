/* ---------- Cart state (persisted in localStorage) ---------- */
const CART_KEY = "swiggy_clone_cart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || {};
  } catch {
    return {};
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(item, restaurantId) {
  const cart = getCart();
  if (cart.restaurantId && cart.restaurantId !== restaurantId && Object.keys(cart.items || {}).length) {
    if (!confirm("Your cart has items from another restaurant. Clear cart and add this item instead?")) return;
    cart.items = {};
  }
  cart.restaurantId = restaurantId;
  cart.items = cart.items || {};
  cart.items[item.id] = cart.items[item.id] || { ...item, qty: 0 };
  cart.items[item.id].qty += 1;
  saveCart(cart);
  renderMenuQuantities();
  showToast(`${item.name} added to cart`);
}

function removeFromCart(itemId) {
  const cart = getCart();
  if (!cart.items || !cart.items[itemId]) return;
  cart.items[itemId].qty -= 1;
  if (cart.items[itemId].qty <= 0) delete cart.items[itemId];
  if (Object.keys(cart.items).length === 0) cart.restaurantId = null;
  saveCart(cart);
  renderMenuQuantities();
  if (document.querySelector(".cart-page")) renderCartPage();
}

function cartItemCount() {
  const cart = getCart();
  if (!cart.items) return 0;
  return Object.values(cart.items).reduce((sum, i) => sum + i.qty, 0);
}

function updateCartCount() {
  const count = cartItemCount();
  document.querySelectorAll(".cart-count").forEach((el) => {
    el.textContent = count;
    el.style.display = count > 0 ? "inline-flex" : "none";
  });
  const floatBar = document.querySelector(".cart-float-bar");
  if (floatBar) {
    if (count > 0) {
      const cart = getCart();
      const total = Object.values(cart.items).reduce((s, i) => s + i.qty * i.price, 0);
      floatBar.innerHTML = `<span>${count} item${count > 1 ? "s" : ""} | ₹${total}</span><a href="cart.html" style="color:#fff;">View Cart →</a>`;
      floatBar.classList.add("visible");
    } else {
      floatBar.classList.remove("visible");
    }
  }
}

/* ---------- Toast ---------- */
let toastTimer;
function showToast(msg) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 1800);
}

/* ---------- Sign-in drawer ---------- */
function initDrawer() {
  const openBtns = document.querySelectorAll("[data-open-signin]");
  const overlay = document.querySelector(".overlay");
  const drawer = document.querySelector(".drawer");
  const closeBtn = document.querySelector(".drawer-close");
  if (!drawer || !overlay) return;

  const open = () => { overlay.classList.add("open"); drawer.classList.add("open"); };
  const close = () => { overlay.classList.remove("open"); drawer.classList.remove("open"); };

  openBtns.forEach((btn) => btn.addEventListener("click", (e) => { e.preventDefault(); open(); }));
  closeBtn?.addEventListener("click", close);
  overlay.addEventListener("click", close);

  const form = document.querySelector(".drawer-form");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("OTP sent (demo only — no real login)");
    close();
  });
}

/* ---------- Mobile menu ---------- */
function initHamburger() {
  const btn = document.querySelector(".hamburger");
  const nav = document.querySelector(".header-nav");
  btn?.addEventListener("click", () => nav.classList.toggle("mobile-open"));
}

/* ---------- Home page: restaurant grid ---------- */
function renderRestaurantGrid() {
  const grid = document.querySelector(".restaurant-grid");
  if (!grid) return;
  grid.innerHTML = RESTAURANTS.map((r) => `
    <a class="restaurant-card" href="restaurant.html?id=${r.id}">
      <div class="card-image" style="background:${r.color}22;">
        <span>${r.emoji}</span>
        <div class="card-offer">${r.offer}</div>
      </div>
      <div class="card-name">${r.name}</div>
      <div class="card-meta">
        <span class="rating">★ ${r.rating}</span>
        <span>•</span>
        <span>${r.time}</span>
      </div>
      <div class="card-cuisines">${r.cuisines}</div>
      <div class="card-cost">${r.cost}</div>
    </a>
  `).join("");
}

/* ---------- Restaurant page ---------- */
function renderRestaurantPage() {
  const wrap = document.querySelector(".restaurant-detail");
  if (!wrap) return;
  const params = new URLSearchParams(location.search);
  const id = Number(params.get("id")) || RESTAURANTS[0].id;
  const r = getRestaurantById(id) || RESTAURANTS[0];

  document.querySelector(".restaurant-banner").style.background = `${r.color}22`;
  document.querySelector(".restaurant-banner span").textContent = r.emoji;
  document.querySelector(".restaurant-header h1").textContent = r.name;
  document.querySelector(".restaurant-header .cuisines").textContent = r.cuisines;
  document.querySelector(".meta-rating").textContent = `★ ${r.rating}`;
  document.querySelector(".meta-time").textContent = r.time;
  document.querySelector(".meta-cost").textContent = r.cost;
  document.title = `${r.name} — Menu | Swiggy Clone`;

  const list = document.querySelector(".menu-list");
  list.innerHTML = r.menu.map((item) => `
    <div class="menu-item" data-item-id="${item.id}">
      <div class="menu-item-info">
        <span class="veg-dot ${item.veg ? "" : "nonveg"}"></span>
        <div class="menu-item-name">${item.name}</div>
        <div class="menu-item-price">₹${item.price}</div>
        <div class="rating" style="font-size:12px;">★ ${item.rating}</div>
        <div class="menu-item-desc">${item.desc}</div>
      </div>
      <div class="menu-item-image">
        <div class="img-box" style="background:${r.color}22;">${r.emoji}</div>
        <div class="add-zone" data-add-zone="${item.id}"></div>
      </div>
    </div>
  `).join("");

  list.querySelectorAll(".add-zone").forEach((zone) => {
    const itemId = Number(zone.dataset.addZone);
    const item = r.menu.find((m) => m.id === itemId);
    zone.addEventListener("click", (e) => {
      const target = e.target.closest("[data-action]");
      if (!target) return;
      if (target.dataset.action === "add") addToCart(item, r.id);
      if (target.dataset.action === "inc") addToCart(item, r.id);
      if (target.dataset.action === "dec") removeFromCart(item.id);
    });
  });

  renderMenuQuantities();
}

function renderMenuQuantities() {
  const zones = document.querySelectorAll("[data-add-zone]");
  if (!zones.length) return;
  const cart = getCart();
  zones.forEach((zone) => {
    const itemId = Number(zone.dataset.addZone);
    const qty = cart.items?.[itemId]?.qty || 0;
    zone.innerHTML = qty > 0
      ? `<div class="qty-control"><button data-action="dec" aria-label="Decrease quantity">−</button><span>${qty}</span><button data-action="inc" aria-label="Increase quantity">+</button></div>`
      : `<button class="add-btn" data-action="add">ADD</button>`;
  });
}

/* ---------- Cart page ---------- */
function renderCartPage() {
  const page = document.querySelector(".cart-page");
  if (!page) return;
  const cart = getCart();
  const items = Object.values(cart.items || {});
  const body = document.querySelector(".cart-body");

  if (!items.length) {
    body.innerHTML = `
      <div class="empty-state">
        <div class="emoji">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add items from a restaurant to get started</p>
        <a href="index.html" class="btn btn-primary" style="margin-top:16px;display:inline-flex;">Browse restaurants</a>
      </div>`;
    return;
  }

  const r = getRestaurantById(cart.restaurantId);
  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  const deliveryFee = 40;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + taxes;

  body.innerHTML = `
    <h1>Your Cart</h1>
    <p class="cart-restaurant-name">${r ? r.name : ""}</p>
    <div class="cart-items">
      ${items.map((i) => `
        <div class="cart-item">
          <div>
            <span class="veg-dot ${i.veg ? "" : "nonveg"}"></span>
            <span class="cart-item-name">${i.name}</span>
            <div class="cart-item-price">₹${i.price} × ${i.qty} = ₹${i.price * i.qty}</div>
          </div>
          <div class="qty-control" style="width:90px;">
            <button data-remove="${i.id}" aria-label="Decrease quantity">−</button>
            <span>${i.qty}</span>
            <button data-add="${i.id}" aria-label="Increase quantity">+</button>
          </div>
        </div>
      `).join("")}
    </div>
    <div class="bill-summary">
      <div class="bill-row"><span>Item total</span><span>₹${subtotal}</span></div>
      <div class="bill-row"><span>Delivery fee</span><span>₹${deliveryFee}</span></div>
      <div class="bill-row"><span>Taxes and charges</span><span>₹${taxes}</span></div>
      <div class="bill-row total"><span>To pay</span><span>₹${total}</span></div>
    </div>
    <button class="btn btn-primary btn-block" style="margin-top:20px;" id="checkout-btn">Proceed to Pay ₹${total}</button>
  `;

  body.querySelectorAll("[data-remove]").forEach((btn) =>
    btn.addEventListener("click", () => removeFromCart(Number(btn.dataset.remove)))
  );
  body.querySelectorAll("[data-add]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const item = items.find((i) => i.id === Number(btn.dataset.add));
      addToCart(item, cart.restaurantId);
      renderCartPage();
    })
  );
  document.getElementById("checkout-btn")?.addEventListener("click", () => {
    showToast("This is a UI demo — checkout is not connected to payments");
  });
}

/* ---------- Search page ---------- */
function initSearchPage() {
  const input = document.querySelector(".search-input");
  if (!input) return;
  const resultsEl = document.querySelector(".search-results");
  const noResultsEl = document.querySelector(".no-results");

  function render(query) {
    const q = query.trim().toLowerCase();
    if (!q) { resultsEl.innerHTML = ""; noResultsEl.style.display = "none"; return; }

    const restaurantMatches = RESTAURANTS.filter((r) =>
      r.name.toLowerCase().includes(q) || r.cuisines.toLowerCase().includes(q)
    );
    const dishMatches = [];
    RESTAURANTS.forEach((r) => {
      r.menu.forEach((item) => {
        if (item.name.toLowerCase().includes(q)) dishMatches.push({ item, restaurant: r });
      });
    });

    if (!restaurantMatches.length && !dishMatches.length) {
      resultsEl.innerHTML = "";
      noResultsEl.style.display = "block";
      return;
    }
    noResultsEl.style.display = "none";

    resultsEl.innerHTML = [
      ...restaurantMatches.map((r) => `
        <a class="result-row" href="restaurant.html?id=${r.id}">
          <div class="result-emoji" style="background:${r.color}22;">${r.emoji}</div>
          <div class="result-info">
            <div class="name">${r.name}</div>
            <div class="meta">${r.cuisines} · ★ ${r.rating}</div>
          </div>
        </a>`),
      ...dishMatches.map(({ item, restaurant: r }) => `
        <a class="result-row" href="restaurant.html?id=${r.id}">
          <div class="result-emoji" style="background:${r.color}22;">${r.emoji}</div>
          <div class="result-info">
            <div class="name">${item.name}</div>
            <div class="meta">₹${item.price} · from ${r.name}</div>
          </div>
        </a>`),
    ].join("");
  }

  input.addEventListener("input", () => render(input.value));
  document.querySelectorAll(".tag").forEach((tag) => {
    tag.addEventListener("click", () => { input.value = tag.textContent; render(input.value); input.focus(); });
  });
}

/* ---------- Help page: FAQ accordion ---------- */
function initFaq() {
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.querySelector(".faq-question").addEventListener("click", () => {
      const wasOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach((o) => o.classList.remove("open"));
      if (!wasOpen) item.classList.add("open");
    });
  });
}

/* ---------- Init on every page ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initDrawer();
  initHamburger();
  updateCartCount();
  renderRestaurantGrid();
  renderRestaurantPage();
  renderCartPage();
  initSearchPage();
  initFaq();
});
