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

// Attach click listeners to all ADD buttons (only runs if they exist on this page)
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