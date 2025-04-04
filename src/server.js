require("dotenv").config();
const express = require("express");
const { sequelize } = require("./config/db"); // Importa primero la conexión a la BD
const usuarioRoutes = require("./routes/UsuarioRoutes");
const session = require("express-session");

const app = express();
app.use(express.json());  

app.set("appName", "prueba crud bases de datos");
app.set("host", "localhost");
app.set("port", 8083);

app.use(
  session({
    secret: "mi_secreto_super_seguro", // Cambia esto por una clave secreta segura
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Usa `true` si tu app está en HTTPS
  })
);

// Verifica que sequelize esté conectado antes de importar modelos
async function startServer() {
  try {
    await sequelize.authenticate(); // Verifica conexión
    console.log("Conectado a la base de datos");

    await sequelize.sync({ force: false }); // Crea las tablas si no existen
    console.log("Base de datos sincronizada");

    app.use("/", usuarioRoutes);

    app.listen(app.get("port"), () => {
      console.log(
        `Servidor corriendo en: http://${app.get("host")}:${app.get("port")}`
      );
    });
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
  }
}

startServer();