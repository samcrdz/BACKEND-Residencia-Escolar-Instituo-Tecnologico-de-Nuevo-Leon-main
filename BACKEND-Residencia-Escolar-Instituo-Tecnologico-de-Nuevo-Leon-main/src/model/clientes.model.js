const db = require("../../config/database");

const getAllClientes = async () => {
  const result = await db.query("SELECT * FROM clientes");
  return result.rows;
};

const getClientById = async (id) => {
  const result = await db.query("SELECT * FROM clientes WHERE id=$1", [id]);
  return result.rows[0];
};

const addNewClient = async (clientData) => {
  const { nombre, direccion, telefono } = clientData;
  const result = await db.query(
    "INSERT INTO clientes (nombre, direccion, telefono) VALUES ($1, $2, $3) RETURNING *",
    [nombre, direccion, telefono]
  );
  return result.rows[0];
};

const editClient = async (clientData) => {
  const { nombre, direccion, telefono, id } = clientData;
  const result = await db.query(
    "UPDATE clientes SET nombre = $1, direccion = $2, telefono = $3 WHERE id = $4 RETURNING *",
    [nombre, direccion, telefono, id]
  );
  return result.rows[0];
};

const deleteClient = async (id) => {
  const result = await db.query(
    "DELETE FROM clientes WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

module.exports = {
  getAllClientes,
  getClientById,
  addNewClient,
  editClient,
  deleteClient,
};
