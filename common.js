// Update cart count on load
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const countSpan = document.getElementById('cartCount');
  if (countSpan) {
    countSpan.textContent = count;
    countSpan.style.display = count > 0 ? 'inline-block' : 'none';
  }
}

// Disable already added items on load
function initCartButtons() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.querySelectorAll('.card').forEach(card => {
    const title = card.querySelector('.card-title').innerText.trim();
    const addButton = card.querySelector('.addToCartBtn');

    const exists = cart.some(item => item.title === title);
    if (exists) {
      addButton.innerText = "✓ Added to the cart";
      addButton.disabled = true;
      addButton.classList.remove("btn-warning");
      addButton.classList.add("btn-success");
    }

    addButton?.addEventListener('click', function () {
      const price = Number(card.getAttribute('data-price'));
      const image = card.querySelector('.card-img-top').src;
      const product = { title, price, image, quantity: 1 };

      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingIndex = cart.findIndex(item => item.title === title);
      if (existingIndex !== -1) {
        alert(`${title} is already in the cart!`);
      } else {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        addButton.innerText = "✓ Added to the cart";
        addButton.disabled = true;
        addButton.classList.remove("btn-warning");
        addButton.classList.add("btn-success");
        alert(`${title} added to cart!`);
      }
    });
  });
}

// Run everything on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  initCartButtons();
});
