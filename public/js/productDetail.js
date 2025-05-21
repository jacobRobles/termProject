document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
  
    if (!productId) {
      document.body.innerHTML = "<p>Product not found.</p>";
      return;
    }
  
    try {
      const res = await fetch(`/api/products/${productId}`);
      const product = await res.json();
  
      if (!product || product.error) {
        document.body.innerHTML = "<p>Product not found.</p>";
        return;
      }
  
      document.getElementById("productImage").src = product.image;
      document.getElementById("productName").textContent = product.name;
      document.getElementById("productPrice").textContent = `$${product.price.toFixed(2)}`;
      document.getElementById("productDescription").textContent = product.description;
  
      document.getElementById("addToCartBtn").addEventListener("click", () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
          existing.quantity += 1;
        } else {
          cart.push({ id: product.id, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Item added to cart!");
      });
    } catch (err) {
      console.error("Failed to load product:", err);
      document.body.innerHTML = "<p>Error loading product.</p>";
    }
  });
  