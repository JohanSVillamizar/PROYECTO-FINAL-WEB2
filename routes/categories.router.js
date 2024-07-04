const express = require('express');
const router = express.Router();
const Category = require('../models/categoryModel');

// Index
router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.render('categories/index', { categories });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Create
router.post('/', async (req, res) => {
    try {
        const { name, description } = req.body;
        await Category.create({ name, description });
        res.redirect('/categories');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update
router.put('/:id', async (req, res) => {
    try {
        const { name, description } = req.body;
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).send('Categoría no encontrada');
        }
        Object.assign(category, { name, description });
        await category.save();
        res.redirect('/categories');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Category.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.send('Categoría eliminada');
        } else {
            res.status(404).send('Categoría no encontrada');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
