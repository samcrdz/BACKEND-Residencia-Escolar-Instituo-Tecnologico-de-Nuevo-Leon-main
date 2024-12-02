var express = require('express');
var router = express.Router();
const usuariosController = require("../src/controller/usuarios.controller");
const checkAdminCookie = require('../config/middleware/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/login", usuariosController.login); 

// Ruta para validar la cookie
router.get('/check-cookie', checkAdminCookie, (req, res) => {
  res.status(200).json({ message: 'Cookie válida. Acceso autorizado.' });
});

module.exports = router;
