export class UI {
  constructor() {
    this.productsGrid = document.getElementById('products-grid');
    this.categorySelect = document.getElementById('category');
    this.resultsInfo = document.getElementById('results-info');
    this.cartCount = document.getElementById('cart-count');
    this.cartItems = document.getElementById('cart-items');
    this.cartTotal = document.getElementById('cart-total');
    this.toast = document.getElementById('toast');
  }

  renderCategories(products) {
    const categories = [...new Set(products.map(product => product.category))];
    this.categorySelect.innerHTML = '<option value="all">Todas</option>' + categories
      .map(category => `<option value="${category}">${category}</option>`)
      .join('');
  }

  renderProducts(products) {
    if (!products.length) {
      this.productsGrid.innerHTML = `
        <div class="empty-state">
          <h4>No se encontraron productos</h4>
          <p>Prueba con otra búsqueda o cambia los filtros.</p>
        </div>
      `;
      return;
    }

    this.productsGrid.innerHTML = products.map(product => `
      <article class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <div class="product-body">
          <span class="badge">${product.category}</span>
          <h4>${product.name}</h4>
          <p>${product.description}</p>
          <div class="price-row">
            <span class="price">$${product.price.toFixed(2)}</span>
            <button class="add-button" data-id="${product.id}">Agregar</button>
          </div>
        </div>
      </article>
    `).join('');
  }

  updateResultsInfo(count) {
    this.resultsInfo.textContent = `${count} producto(s) mostrado(s)`;
  }

  renderCart(cart) {
    this.cartCount.textContent = cart.getTotalCount();
    this.cartTotal.textContent = `$${cart.getTotalPrice().toFixed(2)}`;

    if (!cart.items.length) {
      this.cartItems.innerHTML = '<p class="results-info">Tu carrito está vacío.</p>';
      return;
    }

    this.cartItems.innerHTML = cart.items.map(item => `
      <div class="cart-item">
        <div class="cart-item-top">
          <div>
            <strong>${item.name}</strong>
            <p class="results-info">$${item.price.toFixed(2)} c/u</p>
          </div>
          <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
        </div>
        <div class="qty-controls">
          <button class="qty-button" data-action="decrease" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button class="qty-button" data-action="increase" data-id="${item.id}">+</button>
        </div>
      </div>
    `).join('');
  }

  showToast(message) {
    this.toast.textContent = message;
    this.toast.classList.remove('hidden');

    setTimeout(() => {
      this.toast.classList.add('hidden');
    }, 1800);
  }
}
