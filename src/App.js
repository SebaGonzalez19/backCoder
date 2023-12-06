const express = require("express");
const ProductManager = require("./ProductManager");

const app = express();
const port = 3000;

const productManager = new ProductManager("./productos.json");

// obtener todos los productos con límite opcional
app.get("/products", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10);

    // Obtener todos los productos o solo los limitados
    const products = limit ? productManager.getProducts().slice(0, limit) : productManager.getProducts();

    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});

// obtener un producto por ID
app.get("/products/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid, 10);
    const product = productManager.getProductById(productId);

    if (product) {
      res.json({ product });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});

// Iniciar
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
