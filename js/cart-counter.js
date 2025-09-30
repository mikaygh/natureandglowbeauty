document.addEventListener("DOMContentLoaded", () => {
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  document.querySelectorAll(".cart-count").forEach(el => {
    el.textContent = count;
  });
}


  // Run immediately
  updateCartCount();

  // Also listen for storage changes (e.g., in another tab)
  window.addEventListener("storage", updateCartCount);
});
