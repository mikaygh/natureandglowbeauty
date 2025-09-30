document.addEventListener("DOMContentLoaded", () => {
  const checkoutItems = document.getElementById("checkout-items");
  const checkoutTotal = document.getElementById("checkout-total");
  const orderForm = document.getElementById("order-form");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // --- Render cart items ---
  let total = 0;
  checkoutItems.innerHTML = "";

  if (cart.length === 0) {
    checkoutItems.innerHTML = `<p class="empty-msg">Your cart is empty. <a href="shop.html">Go shopping</a></p>`;
    checkoutTotal.textContent = "0.00";

    // Disable form if cart empty
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

  // --- Handle form submission ---
  if (orderForm) {
    orderForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // 🔹 Generate a unique order ID on frontend (optional; PHP also generates)
      const orderId = "ORD-" + Date.now();

      const orderData = {
        orderId: orderId, // ✅ send orderId
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        city: document.getElementById("city").value,
        address: document.getElementById("address").value,
        cart: cart,
        total: total.toFixed(2)
      };

      fetch("order-handler.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      })
        .then(res => res.json())
        .then(data => {
          alert(data.message);
          localStorage.removeItem("cart");
          window.location.href = "index.html";
        })
        .catch(err => {
          console.error(err);
          alert("Something went wrong. Please try again.");
        });
    });
  }
});
