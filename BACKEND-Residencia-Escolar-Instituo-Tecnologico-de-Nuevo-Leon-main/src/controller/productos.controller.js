const productosModel = require("../model/productos.model");

const getAllProducts = async (req, res) => {
  try {
    const productos = await productosModel.getAllProducts();
    res.status(200).json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await productosModel.getProductById(id);

    if (!producto) {
      return res.status(404).send("Producto no encontrado");
    }

    res.status(200).json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

const addNewProduct = async (req, res) => {
  try {
    const productsData = req.body;
    const newProduct = await productosModel.addNewProduct(productsData);
    res.status(200).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

const editProduct = async (req, res) => {
  try {
    const productsData = req.body;
    const productDataWhitId = { ...productsData, id: req.params.id };
    const productUpdated = await productosModel.editProduct(productDataWhitId);

    if (!productUpdated) {
      return res.status(404).send("Cliente no encontrado para actualizar");
    }
    res.status(200).json(productUpdated);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productsDeleted = await productosModel.deleteProduct(id);
    if (!productsDeleted) {
      return res.status(404).send("Producto no encontrado");
    }
    res
      .status(200)
      .json({
        message: "Producto eliminado correctamente",
        client: productsDeleted,
      });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
  editProduct,
  deleteProduct,
};
