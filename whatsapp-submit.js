// quick-whatsapp-fallback.js
document.getElementById('order-form').addEventListener('submit', function(e){
  e.preventDefault();
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) { alert('Cart is empty'); return; }

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();

  // Build text
  let total = 0;
  let text = `New order from ${name}%0APhone: ${phone}%0AAddress: ${address}%0A%0AItems:%0A`;
  cart.forEach(item => {
    const line = `${item.name} x${item.quantity} - ₵${(item.price * item.quantity).toFixed(2)}`;
    text += `${encodeURIComponent(line)}%0A`;
    total += item.price * item.quantity;
  });
  text += `%0ATotal: ₵${total.toFixed(2)}`;

  // Vendor phone in international format without + or symbols, e.g. 233XXXXXXXXX
  const vendorPhone = '233241334664';
  const waUrl = `https://wa.me/${vendorPhone}?text=${text}`;

  // open in new tab/window
  window.open(waUrl, '_blank');

  // optional: clear cart if you want
  // localStorage.removeItem('cart');
  // window.dispatchEvent(new Event('cart-updated'));
});
