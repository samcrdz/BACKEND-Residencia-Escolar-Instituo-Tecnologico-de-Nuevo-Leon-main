const express = require("express");
const router = express.Router();
const productosController = require("../src/controller/productos.controller");

router.get("/", productosController.getAllProducts);
router.get("/producto/:id", productosController.getProductById);
router.post("/producto", productosController.addNewProduct);
router.put("/producto/:id", productosController.editProduct);
router.delete("/producto/:id", productosController.deleteProduct);

module.exports = router;
