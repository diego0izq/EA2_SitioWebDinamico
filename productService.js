export class ProductService {
  static async getProducts() {
    const response = await fetch('./data/products.json');

    if (!response.ok) {
      throw new Error('No fue posible cargar el archivo JSON de productos.');
    }

    return await response.json();
  }
}
