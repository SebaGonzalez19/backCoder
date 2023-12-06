const fs = require("fs");

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = this.loadProducts();
    this.lastProductId = this.getLastProductId();
  }

  //cargar y guardar en el archivo
  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, "utf-8");
      return JSON.parse(data) || [];
    } catch (error) {
      console.error("Error al leer el archivo: ", error.message);
      return [];
    }
  }

  saveProducts() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
      console.log("Productos guardados en el archivo con exito");
    } catch (error) {
      console.error("Error al guardar productos en el archivo: ", error.message);
    }
  }

  // Agregar producto
  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Todos los campos son obligatorios");
      return;
    }

    const product = {
      id: this.lastProductId + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(product);
    console.log("Producto agregado con éxito", product);
  }

  // Obtener los productos
  getProducts() {
    return this.products;
  }

  // Producto por id
  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      console.error("Producto no encontrado. Id:", id);
    } else {
      console.log("Producto encontrado:", product);
      return product;
    }
  }

  updateProduct(id, updatedFields) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedFields };
      this.saveProducts();
      console.log("Producto actualizado con éxito", this.products[index]);
    } else {
      console.error("Producto no encontrado. Id: ", id);
    }
  }

  deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProducts();
      console.log("Producto eliminado con exito");
    } else {
      console.error("Producto no encontrado. Id: ", id);
    }
  }

  getLastProductId() {
    if (this.products.length === 0) {
      return 0;
    }

    return Math.max(...this.products.map((product) => product.id)) || 0;
  }
}

module.exports = ProductManager;
