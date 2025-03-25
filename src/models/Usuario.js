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
      unique: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    contrasenha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // 0 = cliente, 1 = usuario
    rol: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  },
  {
    tableName: "usuario",
    timestamps: false,
  }
);

module.exports = Usuario;
