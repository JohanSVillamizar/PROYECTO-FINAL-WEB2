const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const Category = require('./categoryModel');

const Inventory = sequelize.define(
    'Inventory', // Nombre del modelo, coincidente con el nombre de la tabla en la base de datos
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
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: true
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        entry_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
    },
    {
        tableName: 'inventory', // Nombre exacto de la tabla en la base de datos
        timestamps: true, // Opcional, dependiendo de tus requerimientos
    }
);

Inventory.belongsTo(Category, { foreignKey: 'categoryId' }); // Definición de la relación con Category


Inventory.sync({ alter: true })
    .then(() => {
        console.log('Tabla de inventario sincronizada correctamente.');
    })
    .catch((error) => {
        console.error('Error al sincronizar tabla de inventario:', error);
    });

module.exports = Inventory;
