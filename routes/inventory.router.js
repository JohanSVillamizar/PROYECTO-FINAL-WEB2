const express = require('express');
const router = express.Router();
const { Sequelize, Op } = require('sequelize');
const Inventory = require('../models/inventoryModel');
const Category = require('../models/categoryModel');

// Index
router.get('/', async (req, res) => {
    try {
        const inventory = await Inventory.findAll({
            include: Category // Incluir la asociación con la categoría
        });
        const categories = await Category.findAll(); // Obtener todas las categorías
        res.render('inventory/index', { inventory, categories }); // Pasar inventory y categories a la vista
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Ruta para obtener datos del gráfico
router.get('/chart-data', async (req, res) => {
    try {
        const data = await Inventory.findAll({
            attributes: [
                [Sequelize.literal('"Category"."name"'), 'categoryName'], // Uso de Sequelize.literal para seleccionar "Category"."name"
                [Sequelize.fn('COUNT', Sequelize.col('Inventory.categoryId')), 'productCount'] // Contar productos por categoryId
            ],
            include: {
                model: Category,
                attributes: [] // Excluir selección automática de todas las columnas de Category
            },
            group: ['Category.name'] // Agrupar por el nombre de la categoría
        });

        const chartData = data.map(item => ({
            category: item.dataValues.categoryName,
            count: item.dataValues.productCount
        }));

        res.json(chartData);
    } catch (error) {
        console.error('Error al obtener datos del gráfico:', error);
        res.status(500).send(error.message);
    }
});

// Create
router.post('/', async (req, res) => {
    try {
        const { name, description, quantity, location, brand, price, entry_date, categoryId } = req.body;
        await Inventory.create({ name, description, quantity, location, brand, price, entry_date, categoryId });
        res.redirect('/inventory');
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// Update
router.put('/:id', async (req, res) => {
    try {
        const { name, description, quantity, location, brand, price, entry_date, categoryId } = req.body;
        const inventoryItem = await Inventory.findByPk(req.params.id);
        if (!inventoryItem) {
            return res.status(404).send('Producto no encontrado');
        }
        const serial_number = uuidv4(); // Generar el UUID aquí si es necesario
        Object.assign(inventoryItem, { name, description, quantity, location, brand, price, entry_date, categoryId });
        await inventoryItem.save();
        res.redirect('/inventory');
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// Delete
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Inventory.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.send('Producto eliminado');
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
