import { StorageManager } from './storage.js';

export class Cart {
  constructor() {
    this.items = StorageManager.getCart();
  }

  add(product) {
    const existing = this.items.find(item => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }

    this.persist();
  }

  increase(id) {
    const item = this.items.find(product => product.id === id);
    if (item) item.quantity += 1;
    this.persist();
  }

  decrease(id) {
    const item = this.items.find(product => product.id === id);
    if (!item) return;

    item.quantity -= 1;
    this.items = this.items.filter(product => product.quantity > 0);
    this.persist();
  }

  clear() {
    this.items = [];
    this.persist();
  }

  getTotalCount() {
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
  }

  getTotalPrice() {
    return this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  persist() {
    StorageManager.saveCart(this.items);
  }
}
