// Show toast function - make it global so other scripts can call it
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

document.addEventListener('DOMContentLoaded', async () => {
  const cartItemsDiv = document.getElementById('cart-items');
  const subtotalEl = document.getElementById('subtotal-amount');
  const taxEl = document.getElementById('estimated-tax');
  const totalEl = document.getElementById('total-amount');

  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    cartItemsDiv.innerHTML = '<p>Please log in to view your cart.</p>';
    return;
  }

  try {
    // Fetch cart items from server
    const res = await fetch(`/api/cart/${user.id}`);
    const cartItems = await res.json();

    if (cartItems.length === 0) {
      cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
      return;
    }

    let subtotal = 0;

    cartItems.forEach(item => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      const itemDiv = document.createElement('div');
      itemDiv.classList.add('product-item');
      itemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="product-image">
        <div class="product-details">
          <h3 class="product-name">${item.name}</h3>
          <p class="product-variant">Qty: ${item.quantity}</p>
          <p class="product-price">$${itemTotal.toFixed(2)}</p>
        </div>
      `;
      cartItemsDiv.appendChild(itemDiv);
    });

    const tax = subtotal * 0.08; // 8% tax
    const shipping = 8.99;
    const total = subtotal + tax + shipping;

    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    taxEl.textContent = `$${tax.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;

  } catch (err) {
    cartItemsDiv.innerHTML = '<p>Failed to load cart items.</p>';
    console.error('Error loading cart:', err);
  }

  // Clear cart handler (server-side)
  const clearBtn = document.getElementById('clearCartBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', async () => {
      try {
        const res = await fetch(`/api/cart/${user.id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          showToast('Cart has been cleared!');
          setTimeout(() => window.location.reload(), 2000);
        } else {
          showToast('Failed to clear cart.');
        }
      } catch (err) {
        console.error('Error clearing cart:', err);
        showToast('Error clearing cart.');
      }
    });
  }
});
