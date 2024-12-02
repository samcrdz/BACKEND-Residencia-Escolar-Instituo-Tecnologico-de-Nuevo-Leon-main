const db = require("../../config/database");

// const getAllInstalaciones = async () => {
//   const result = await db.query("SELECT * FROM instalaciones");
//   return result.rows;
// };


const getAllInstalaciones = async () => {
  const result = await db.query(`
    SELECT 
      i.*, 
      c.nombre AS cliente_nombre, 
      p.nombre AS producto_nombre 
    FROM instalaciones i
    JOIN clientes c ON i.cliente_id = c.id
    JOIN productos p ON i.producto_id = p.id
  `);
  return result.rows;
};

const getInstalacionById = async (id) => {
  const result = await db.query("SELECT * FROM instalaciones WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};

const addNewInstalacion = async (instalacionData) => {
  const {
    cliente_id,
    producto_id,
    fecha_instalacion,
    descripcion,
    costo_instalacion,
    estado,
  } = instalacionData;

  const result = await db.query(
    "INSERT INTO instalaciones (cliente_id, producto_id, fecha_instalacion, descripcion, costo_instalacion, estado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [
      cliente_id,
      producto_id,
      fecha_instalacion,
      descripcion,
      costo_instalacion,
      estado,
    ]
  );

  return result.rows[0];
};

const editInstalacion = async (instalacionData) => {
  const {
    id,
    cliente_id,
    producto_id,
    fecha_instalacion,
    descripcion,
    costo_instalacion,
    estado,
  } = instalacionData;

  const result = await db.query(
    "UPDATE instalaciones SET cliente_id = $1, producto_id = $2, fecha_instalacion = $3, descripcion = $4, costo_instalacion = $5, estado = $6 WHERE id = $7 RETURNING *",
    [
      cliente_id,
      producto_id,
      fecha_instalacion,
      descripcion,
      costo_instalacion,
      estado,
      id,
    ]
  );

  return result.rows[0];
};

const deleteInstalacion = async (id) => {
  const result = await db.query(
    "DELETE FROM instalaciones WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

module.exports = {
  getAllInstalaciones,
  getInstalacionById,
  addNewInstalacion,
  editInstalacion,
  deleteInstalacion,
};
