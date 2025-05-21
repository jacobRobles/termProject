document.addEventListener('DOMContentLoaded', async () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsDiv = document.getElementById('cart-items');
    const subtotalEl = document.getElementById('subtotal-amount');
    const taxEl = document.getElementById('estimated-tax');
    const totalEl = document.getElementById('total-amount');
  
    if (cart.length === 0) {
      cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
      return;
    }
  
    try {
      const res = await fetch('/api/products');
      const products = await res.json();
  
      let subtotal = 0;
  
      cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return;
  
        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;
  
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('product-item');
        itemDiv.innerHTML = `
          <img src="${product.image}" alt="${product.name}" class="product-image">
          <div class="product-details">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-variant">Qty: ${item.quantity}</p>
            <p class="product-price">$${itemTotal.toFixed(2)}</p>
          </div>
        `;
        cartItemsDiv.appendChild(itemDiv);
      });
  
      const tax = subtotal * 0.08; // 8% tax, could be changed if needed idk
      const shipping = 8.99;
      const total = subtotal + tax + shipping;
  
      subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
      taxEl.textContent = `$${tax.toFixed(2)}`;
      totalEl.textContent = `$${total.toFixed(2)}`;
  
    } catch (err) {
      cartItemsDiv.innerHTML = '<p>Failed to load cart items.</p>';
      console.error(err);
    }
  });
  