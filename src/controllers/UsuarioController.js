const Usuario = require("../models/Usuario");

const login = async (req, res) => {
  const { correo, contrasenha } = req.body;

  if (!correo || !contrasenha) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const user = await Usuario.findOne({ where: { correo, contrasenha } });

    if (user) {
      req.session.usuario = {
        id: user.idusuario,
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo,
        rol: user.rol,
      };

      console.log(req.session.usuario);
      return res.json({ success: true, message: "Inicio de sesión exitoso"});
    } else {
      return res.status(401).json({ success: false, message: "Credenciales incorrectas" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

const bienvenida = (req, res) => {
  if (!req.session.usuario) {
    return res.status(401).json({ message: "No has iniciado sesión" });
  }

  res.send(`<h1>¡Bienvenido, ${req.session.usuario.nombre}!</h1>`);
};

const verificarRol = (req, res, next) => {
  if (!req.session || !req.session.usuario) {
    return res.status(401).send("No autorizado, inicie sesión primero");
  }

  if (req.session.usuario.rol === true) {
    next(); // Admin puede acceder a todo
  } else {
    return res
      .status(403)
      .send("No autorizado, necesitas permisos de administrador");
  }
};

const getAdmin = async (req, res) => {
  res.send("Pagina pa admins");
};

const getCliente = async (req, res) => {
  res.send("Pagina pa clientes");
};

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Obtener un usuario por ID
const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Crear un usuario
const crearUsuario = async (req, res) => {
  try {
    const { nombre, apellido, correo, contrasenha, rol } = req.body;

    if (!nombre || !apellido || !correo || !contrasenha || rol === undefined) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    // 🔹 Verificar si el usuario ya existe antes de crearlo
    const usuarioExistente = await Usuario.findOne({ where: { correo } });

    if (usuarioExistente) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    // 🔹 Si el usuario no existe, se crea uno nuevo
    const nuevoUsuario = await Usuario.create({
      nombre,
      apellido,
      correo,
      contrasenha,
      rol,
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un usuario
const actualizarUsuario = async (req, res) => {
  try {
    const { nombre, apellido, correo, contrasenha, rol } = req.body;
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (nombre != null) {
      usuario.nombre = nombre;
    }

    if (apellido != null) {
      usuario.apellido = apellido;
    }

    if (correo != null) {
      usuario.correo = correo;
    }

    if (contrasenha != null) {
      usuario.contrasenha = contrasenha;
    }

    if (rol != null) {
      usuario.rol = rol;
    }

    await usuario.save();

    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un usuario
const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });

    await usuario.destroy();
    res.json({ mensaje: "Usuario eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  login,
  bienvenida,
  verificarRol,
  getAdmin,
  getCliente,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
