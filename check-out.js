document.addEventListener("DOMContentLoaded", () => {
  // Load cart
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const checkoutItems = document.getElementById("checkout-items");
  const checkoutTotal = document.getElementById("checkout-total");
  const orderForm = document.getElementById("order-form");

  let total = 0;
  checkoutItems.innerHTML = "";

  // 🔹 Update cart counter on checkout page too
  function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll(".cart-count").forEach(el => {
      el.textContent = count;
    });
  }

  if (cart.length === 0) {
    checkoutItems.innerHTML = `<p class="empty-msg">Your cart is empty. <a href="shop.html">Go shopping</a></p>`;
    checkoutTotal.textContent = "0.00";

    // 🔹 Disable form if cart is empty
    if (orderForm) {
      orderForm.querySelectorAll("input, textarea, button").forEach(el => {
        el.disabled = true;
      });
    }
  } else {
    cart.forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("checkout-item");

      itemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="checkout-item-details">
          <h4>${item.name}</h4>
          <p>Quantity: ${item.quantity}</p>
          <p>Price: ₵${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      `;
      checkoutItems.appendChild(itemDiv);

      total += item.price * item.quantity;
    });

    checkoutTotal.textContent = total.toFixed(2);
  }

  // 🔹 Always update the counter
  updateCartCount();

  // 🔹 Handle form submission
  if (orderForm) {
    orderForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const orderData = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        cart: cart,
        total: total
      };

      console.log("Order submitted:", orderData);

      alert("Your order has been placed! We'll contact you soon.");
      localStorage.removeItem("cart");
      window.location.href = "index.html";
    });
  }
});



// Generate order ID

function generateOrderId() {
  return "ORD-" + Date.now().toString(36) + "-" + Math.floor(Math.random() * 1000);
}

orderForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const orderId = generateOrderId();

  const orderData = {
    orderId: orderId,
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    city: document.getElementById("city").value,
    address: document.getElementById("address").value,
    cart: cart,
    total: total
  };

  // send orderData to backend (PHP or Node)
});



