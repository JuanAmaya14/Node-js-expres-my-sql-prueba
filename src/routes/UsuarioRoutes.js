const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

router.post("/", usuarioController.login);
router.get("/bienvenida", usuarioController.bienvenida);
router.get("/usuario", usuarioController.obtenerUsuarios);
router.get("/usuario/:id", usuarioController.obtenerUsuarioPorId);
router.post("/usuario", usuarioController.crearUsuario);
router.put("/usuario/:id", usuarioController.actualizarUsuario);
router.delete("/usuario/:id", usuarioController.eliminarUsuario);

router.get("/admin", usuarioController.verificarRol,usuarioController.getAdmin);

router.get("/cliente", usuarioController.getCliente);

module.exports = router;
