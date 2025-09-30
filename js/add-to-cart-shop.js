document.addEventListener("DOMContentLoaded", function () {
  const cartButtons = document.querySelectorAll(".btn-cart");

  // Function to update cart count
  function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll(".cart-count").forEach(el => {
      el.textContent = count;
    });
  }

  // Initialize cart count on page load
  updateCartCount();

  // Add to cart functionality
  cartButtons.forEach(button => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const card = e.target.closest(".shop-card, .product-details, .related-card");
      if (!card) return;

      let product = {};
      if (card.classList.contains("shop-card")) {
        product = {
          id: card.querySelector("h2").textContent.trim(),
          name: card.querySelector("h2").textContent.trim(),
          price: parseFloat(card.querySelector(".price").textContent.replace("₵", "")),
          image: card.querySelector("img").src,
          quantity: 1
        };
      } else if (card.classList.contains("product-details")) {
        product = {
          id: card.querySelector("h1").textContent.trim(),
          name: card.querySelector("h1").textContent.trim(),
          price: parseFloat(card.querySelector(".product-price").textContent.replace("₵", "")),
          image: document.querySelector(".product-image img").src,
          quantity: 1
        };
      } else if (card.classList.contains("related-card")) {
        product = {
          id: card.querySelector("h3").textContent.trim(),
          name: card.querySelector("h3").textContent.trim(),
          price: parseFloat(card.querySelector(".price").textContent.replace("₵", "")),
          image: card.querySelector("img").src,
          quantity: 1
        };
      }

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find(item => item.id === product.id);
      if (existing) {
        existing.quantity++;
      } else {
        cart.push(product);
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      // Update badge
      updateCartCount();
    });
  });
});
