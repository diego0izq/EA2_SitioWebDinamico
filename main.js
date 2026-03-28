import { ProductService } from './productService.js';
import { Cart } from './cart.js';
import { UI } from './ui.js';

const ui = new UI();
const cart = new Cart();

const state = {
  products: [],
  filteredProducts: []
};

const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('category');
const sortSelect = document.getElementById('sort');
const clearFiltersButton = document.getElementById('clear-filters');
const cartToggleButton = document.getElementById('cart-toggle');
const closeCartButton = document.getElementById('close-cart');
const clearCartButton = document.getElementById('clear-cart');
const cartSidebar = document.getElementById('cart-sidebar');

function applyFilters() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedCategory = categorySelect.value;
  const selectedSort = sortSelect.value;

  let filtered = [...state.products].filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm)
      || product.description.toLowerCase().includes(searchTerm);

    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  switch (selectedSort) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      break;
  }

  state.filteredProducts = filtered;
  ui.renderProducts(filtered);
  ui.updateResultsInfo(filtered.length);
}

function setupEventListeners() {
  searchInput.addEventListener('input', applyFilters);
  categorySelect.addEventListener('change', applyFilters);
  sortSelect.addEventListener('change', applyFilters);

  clearFiltersButton.addEventListener('click', () => {
    searchInput.value = '';
    categorySelect.value = 'all';
    sortSelect.value = 'default';
    applyFilters();
  });

  document.addEventListener('click', event => {
    const addButton = event.target.closest('.add-button');
    const qtyButton = event.target.closest('.qty-button');

    if (addButton) {
      const id = Number(addButton.dataset.id);
      const product = state.products.find(item => item.id === id);
      if (!product) return;
      cart.add(product);
      ui.renderCart(cart);
      ui.showToast('Producto agregado al carrito');
    }

    if (qtyButton) {
      const id = Number(qtyButton.dataset.id);
      const action = qtyButton.dataset.action;

      if (action === 'increase') cart.increase(id);
      if (action === 'decrease') cart.decrease(id);

      ui.renderCart(cart);
    }
  });

  cartToggleButton.addEventListener('click', () => {
    cartSidebar.classList.toggle('hidden');
  });

  closeCartButton.addEventListener('click', () => {
    cartSidebar.classList.add('hidden');
  });

  clearCartButton.addEventListener('click', () => {
    cart.clear();
    ui.renderCart(cart);
    ui.showToast('Carrito vaciado correctamente');
  });
}

async function init() {
  try {
    state.products = await ProductService.getProducts();
    ui.renderCategories(state.products);
    ui.renderProducts(state.products);
    ui.updateResultsInfo(state.products.length);
    ui.renderCart(cart);
    setupEventListeners();
  } catch (error) {
    ui.productsGrid.innerHTML = `
      <div class="empty-state">
        <h4>Ocurrió un error</h4>
        <p>${error.message}</p>
      </div>
    `;
    ui.updateResultsInfo(0);
  }
}

init();
