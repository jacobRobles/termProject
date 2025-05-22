document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (!productId) {
    document.body.innerHTML = "<p>Product is not found.</p>";
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

    document.getElementById("addToCartBtn").addEventListener("click", async () => {
      // Check if user is logged in
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        showToast('Please log in to add items to cart.');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1500);
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
            productId: product.id,
            quantity: 1
          })
        });

        const result = await response.json();

        if (response.ok) {
          showToast('Item added to cart!');
        } else {
          showToast(result.error || 'Failed to add item to cart');
        }
      } catch (err) {
        console.error('Error adding to cart:', err);
        showToast('Failed to add item to cart');
      }
    });
  } catch (err) {
    console.error("Failed to load product:", err);
    document.body.innerHTML = "<p>Error loading product.</p>";
  }
});

// Toast notification function
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}
