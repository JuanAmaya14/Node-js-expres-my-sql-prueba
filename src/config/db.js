const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME, // Nombre de la BD
  process.env.DB_USER, // Usuario de la BD
  process.env.DB_PASSWORD, // Contraseña de la BD
  {
    host: process.env.DB_HOST, // Servidor de la BD
    dialect: "mysql", // O "mssql" si usas SQL Server
    logging: false, // Evita logs en consola
  }
);

module.exports = { sequelize };
