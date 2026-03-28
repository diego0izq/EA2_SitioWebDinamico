const CART_KEY = 'techzone-cart';

export class StorageManager {
  static saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  static getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  }
}
