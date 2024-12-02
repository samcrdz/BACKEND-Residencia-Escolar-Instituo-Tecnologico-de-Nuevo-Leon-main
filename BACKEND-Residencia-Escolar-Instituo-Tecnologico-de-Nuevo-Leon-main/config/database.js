const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '12345',
  host: 'localhost',
  port: 5432,
  database: 'sistema_inventario'
})

pool.connect((error) => {
  if (error) {
    console.error("Error al conectar la base de datos", error.stack);
  } else {
    console.log('\x1b[32m✅ Base de datos conectada!\x1b[0m');
  }
})

module.exports = {
  query: (text, params) => pool.query(text, params)
};