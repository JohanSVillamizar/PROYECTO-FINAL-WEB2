const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const Category = require('./categoryModel');

const Inventory = sequelize.define(
    'inventory',
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
        serial_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        categoryId: {
            type: DataTypes.INTEGER,
            references: {
                model: Category,
                key: 'id'
            }
        }
    },
    {
        createdAt: 'entry_date',
        updatedAt: 'updated_at',
    }
);

Inventory.sync({ alter: true });
module.exports = Inventory;
