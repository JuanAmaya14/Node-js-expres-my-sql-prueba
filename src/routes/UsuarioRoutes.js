const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

router.get("/", usuarioController.inicio);
router.get("/usuario", usuarioController.obtenerUsuarios);
router.get("/usuario/:id", usuarioController.obtenerUsuarioPorId);
router.post("/usuario", usuarioController.crearUsuario);
router.put("/usuario/:id", usuarioController.actualizarUsuario);
router.delete("/usuario/:id", usuarioController.eliminarUsuario);

module.exports = router;
