const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db"); // Asegúrate de que la ruta es correcta

if (!sequelize) {
  throw new Error("Error: La conexión con la base de datos no está definida");
}

const Usuario = sequelize.define(
  "usuario",
  {
    idusuario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "usuario",
    timestamps: false,
  }
);

module.exports = Usuario;
