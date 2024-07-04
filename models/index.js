const Inventory = require('./inventoryModel');
const Category = require('./categoryModel');

// Estableciendo la relación entre Inventory y Category
Category.hasMany(Inventory, { foreignKey: 'categoryId' });
Inventory.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = {
    Inventory,
    Category,
};
