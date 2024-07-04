// categoryModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Category = sequelize.define(
    'Category', // Nombre del modelo, coincidente con el nombre de la tabla en la base de datos
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        tableName: 'category', // Nombre exacto de la tabla en la base de datos
        timestamps: true, // Opcional, dependiendo de tus requerimientos
    }
);

Category.sync({ alter: true }); 
module.exports = Category;
