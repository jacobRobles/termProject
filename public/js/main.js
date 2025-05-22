// Load products from API and render them
document.addEventListener('DOMContentLoaded', async () => {
    const productGrid = document.getElementById('product-grid');
    const searchInput = document.getElementById('searchInput'); // null
    let searchFromURL = null;

    let allProducts = [];
  
    async function loadProducts() {
      try {
        const res = await fetch('/api/products');
        allProducts = await res.json();
        displayProducts(allProducts);
      } catch (err) {
        console.error('Failed to load products:', err);
      }
    }
  
    function displayProducts(products) {
      productGrid.innerHTML = '';
      products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
  <a href="product.html?id=${product.id}">
    <img src="${product.image}" alt="${product.name}" class="product-image">
    <h3>${product.name}</h3>
  </a>
  <p>$${product.price.toFixed(2)}</p>
  <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
`;

        productGrid.appendChild(card);
      });
  
      document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
          const productId = parseInt(button.getAttribute('data-id'));
          addToCart(productId);
        });
      });
    }
  
    async function addToCart(productId) {
      // Check if user is logged in
      const user = JSON.parse(localStorage.getItem('user'));
      
      if (!user) {
        alert('Please log in to add items to cart.');
        window.location.href = 'login.html';
        return;
      }

      try {
        const response = await fetch('/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
            productId: productId,
            quantity: 1
          })
        });

        const result = await response.json();
        
        if (response.ok) {
          alert('Item added to cart!');
        } else {
          alert(result.error || 'Failed to add item to cart');
        }
      } catch (err) {
        console.error('Error adding to cart:', err);
        alert('Failed to add item to cart');
      }
    }
  
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        const term = searchInput.value.toLowerCase();
        const filtered = allProducts.filter(product =>
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term)
        );
        displayProducts(filtered);
      });
    }
  
    loadProducts().then(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchFromURL = urlParams.get('q');
        const categoryParam = urlParams.get('category');
      
        if (searchFromURL) {
          const filtered = allProducts.filter(product =>
            product.name.toLowerCase().includes(searchFromURL.toLowerCase()) ||
            product.description.toLowerCase().includes(searchFromURL.toLowerCase())
          );
          displayProducts(filtered);
        } else if (categoryParam) {
          const filtered = allProducts.filter(product =>
            product.category.toLowerCase() === categoryParam.toLowerCase()
          );
          displayProducts(filtered);
        } else {
          displayProducts(allProducts);
        }
      });
});
      
  
