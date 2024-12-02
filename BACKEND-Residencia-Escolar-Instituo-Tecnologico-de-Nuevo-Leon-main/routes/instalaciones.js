const express = require('express');
const router = express.Router();
const instalacionesController = require('../src/controller/instalacion.controller');

router.get('/', instalacionesController.getAllInstalaciones);
router.get('/instalacion/:id', instalacionesController.getInstalacionById);
router.post('/instalacion', instalacionesController.addNewInstalacion);
router.put('/instalacion/:id', instalacionesController.editInstalacion);
router.delete('/instalacion/:id', instalacionesController.deleteInstalacion);

module.exports = router;
