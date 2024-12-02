const express = require("express");
const router = express.Router();
const usuariosController = require("../src/controller/usuarios.controller");
const checkAdminCookie = require("../config/middleware/auth");

// validamos la cookie
// router.use(checkAdminCookie);

router.get("/", usuariosController.getAllUsers);
router.get("/usuario/:id", usuariosController.getUserById);
router.post("/usuario", usuariosController.createUser);
router.delete("/usuario/:id", usuariosController.deleteUser);

module.exports = router;