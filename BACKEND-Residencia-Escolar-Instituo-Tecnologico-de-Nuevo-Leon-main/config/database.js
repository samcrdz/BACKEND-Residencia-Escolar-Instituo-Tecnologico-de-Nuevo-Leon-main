/* 
  pg es una libreria que permite conectarnos a la base de datos creando una instancia con el objeto Pool

  despues le pasamos los parametros a una constante que es la que nos permite acceder a la base de datos alojada en nuestro servidor local

  el metodo connect nos permite testear la conexion a la base de datos, en este caso ponemos dos logs como debug para verificar la salida del connect
*/

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '12345',
  host: 'localhost',
  port: 5433,
  database: 'sistema _inventario'
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
