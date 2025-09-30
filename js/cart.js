let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 🔹 Function to refresh cart counter everywhere
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll(".cart-count").forEach(el => {
    el.textContent = count;
  });
}

// 🔹 Render cart table (only exists on cart page)
function renderCart() {
  const tbody = document.getElementById("cart-items");
  const subtotalEl = document.getElementById("cart-subtotal");
  const totalEl = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");

  if (!tbody) {
    updateCartCount(); // still refresh counters on other pages
    return;
  }

  tbody.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td><img src="${item.image}" alt="${item.name}"></td>
      <td>₵${item.price.toFixed(2)}</td>
      <td>
        <div class="qty-control">
          <button class="qty-btn decrease" data-index="${index}">−</button>
          <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="qty-input">
          <button class="qty-btn increase" data-index="${index}">+</button>
        </div>
      </td>
      <td>₵${itemTotal.toFixed(2)}</td>
      <td><button data-index="${index}" class="remove-btn">🗑️</button></td>
    `;
    tbody.appendChild(row);
  });

  if (subtotalEl && totalEl) {
    subtotalEl.textContent = subtotal.toFixed(2);
    totalEl.textContent = subtotal.toFixed(2);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  // 🔹 Disable checkout button if cart empty
  if (checkoutBtn) {
    if (cart.length === 0) {
      checkoutBtn.disabled = true;
      checkoutBtn.classList.add("disabled");
    } else {
      checkoutBtn.disabled = false;
      checkoutBtn.classList.remove("disabled");
    }
  }
}

// 🔹 Update quantity
document.addEventListener("input", e => {
  if (e.target.classList.contains("qty-input")) {
    const index = e.target.dataset.index;
    cart[index].quantity = parseInt(e.target.value);
    renderCart();
  }
});

// 🔹 Remove item
document.addEventListener("click", e => {
  if (e.target.classList.contains("remove-btn")) {
    const index = e.target.dataset.index;
    cart.splice(index, 1);
    renderCart();
  }
});

// 🔹 Increase / Decrease
document.addEventListener("click", e => {
  if (e.target.classList.contains("increase")) {
    const index = e.target.dataset.index;
    cart[index].quantity++;
    renderCart();
  }
  if (e.target.classList.contains("decrease")) {
    const index = e.target.dataset.index;
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
      renderCart();
    }
  }
});

// 🔹 Checkout button
const checkoutBtn = document.getElementById("checkout-btn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
      window.location.href = "checkout.html";
    }
  });
}

// 🔹 Run on page load
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartCount();
});

// 🔹 Sync across tabs
window.addEventListener("storage", () => {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  renderCart();
  updateCartCount();
});
