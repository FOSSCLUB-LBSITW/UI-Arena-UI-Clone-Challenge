const signinBtn = document.getElementById('signin-btn');
const drawer = document.getElementById('signin-drawer');
const overlay = document.getElementById('drawer-overlay');

signinBtn.addEventListener('click', () => {
  drawer.classList.add('open');
  overlay.classList.add('open');
});

overlay.addEventListener('click', () => {
  drawer.classList.remove('open');
  overlay.classList.remove('open');
});