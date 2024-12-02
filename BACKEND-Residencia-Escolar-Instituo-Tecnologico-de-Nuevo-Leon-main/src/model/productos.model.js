const db = require("../../config/database");

const getAllProducts = async () => {
  const result = await db.query("SELECT * FROM productos");
  return result.rows;
};

const getProductById = async (id) => {
  const result = await db.query("SELECT * FROM productos WHERE id = $1", [id]);
  return result.rows[0];
};

const addNewProduct = async (productsData) => {
  const { nombre, descripcion, precio, stock } = productsData;

  const result = await db.query(
    "INSERT INTO productos (nombre, descripcion, precio, stock) VALUES ($1, $2, $3, $4) RETURNING *",
    [nombre, descripcion, precio, stock]
  );
  return result.rows[0];
};

const editProduct = async (productsData) => {
  const { nombre, descripcion, precio, stock, id } = productsData;
  const result = await db.query(
    "UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, stock = $4 WHERE id = $5 RETURNING *",
    [nombre, descripcion, precio, stock, id]
  );
  return result.rows[0];
};

const deleteProduct = async (id) => {
  const result = await db.query(
    "DELETE FROM productos WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};


module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
  editProduct,
  deleteProduct
};
