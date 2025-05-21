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
  
    function addToCart(productId) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existing = cart.find(item => item.id === productId);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ id: productId, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Item added to cart!');
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
      
  