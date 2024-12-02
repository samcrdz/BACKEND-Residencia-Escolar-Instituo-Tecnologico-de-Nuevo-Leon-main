const db = require("../../config/database");
const bcrypt = require("bcrypt");

const getAllUsers = async () => {
  const result = await db.query("SELECT * FROM usuarios");
  return result.rows;
};

const getUserById = async (id) => {
  const result = await db.query("SELECT * FROM usuarios WHERE id = $1", [id]);
  return result.rows[0];
};

const deleteUser = async (id) => {
  const result = await db.query(
    "DELETE FROM usuarios WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

const createUser = async (nombre, usuario, email, contraseña, rol, estado) => {
  const hashedPassword = await bcrypt.hash(contraseña, 10);

  const result = await db.query(
    "INSERT INTO usuarios (nombre, usuario, email, contraseña, rol, estado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [nombre, usuario, email, hashedPassword, rol, estado]
  );
  return result.rows[0]; 
};

// autenticacion del usuario
const authenticateUser = async (usuario, contraseña) => {
  const result = await db.query("SELECT * FROM usuarios WHERE usuario = $1", [usuario]);
  const user = result.rows[0];

  if (user && await bcrypt.compare(contraseña, user.contraseña)) {
    return user;
  } else {
    return null;
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  getUserById,
  authenticateUser,
  createUser 
};