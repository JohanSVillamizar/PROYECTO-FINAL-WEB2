const express = require('express');
const authRouter = require('./users/auth.router');
const inventoryRouter = require('./inventory.router');
const categoriesRouter = require('./categories.router');

function routerTodos(app) {
    const router = express.Router();

    app.use('/', router);
    router.use('/auth', authRouter);
    router.use('/inventory', inventoryRouter);
    router.use('/categories', categoriesRouter);
}

module.exports = routerTodos;
