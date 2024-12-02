const express = require('express');
const router = express.Router();
const clientesController = require('../src/controller/clientes.controller');

// ruta para los clientes
router.get("/", clientesController.getAllClientes);
router.get("/cliente/:id", clientesController.getClientById);
router.post("/cliente", clientesController.addNewClient);
router.put("/cliente/:id", clientesController.editClient);
router.delete("/cliente/:id", clientesController.deleteClient);

module.exports = router; 
