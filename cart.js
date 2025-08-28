// cart.js

const CART_KEY = "checkout";

// Ambil cart dari localStorage
function loadCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}

// Simpan cart ke localStorage
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Tambah item ke cart
function addToCart(product) {
  const cart = loadCart();
  const index = cart.findIndex(item => item.id === product.id && item.size === product.size);
  if (index > -1) {
    cart[index].qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart(cart);
}

// Hapus item dari cart
function removeFromCart(id, size) {
  let cart = loadCart();
  cart = cart.filter(item => !(item.id === id && item.size === size));
  saveCart(cart);
}

// Hitung total harga
function getCartTotal(cart) {
  return cart.reduce((total, item) => total + item.price * item.qty, 0);
}

// Update tampilan jumlah item cart (optional helper)
function updateCartCount(elId = "cart-count") {
  const cart = loadCart();
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const el = document.getElementById(elId);
  if (el) {
    el.textContent = totalQty > 0 ? totalQty : "";
    el.style.display = totalQty > 0 ? "flex" : "none";
  }
}

// Export ke global scope jika tidak pakai bundler
window.cartUtils = {
  loadCart,
  saveCart,
  addToCart,
  removeFromCart,
  getCartTotal,
  updateCartCount
};
