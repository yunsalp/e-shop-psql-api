const Category = require('../models/category');

const getAllCategories = async () => {
    const categories = await Category.findAll();
    return categories;
}

const getCategoryById = async (id) => {
    const category = await Category.findByPk(id);
    return category;
}

const createCategory = async (data) => {
    const category = await Category.create(data);
    return category;
}

const updateCategory = async (id, data) => {
    let category = await Category.findByPk(id);
    if (category !== null) {
        category = await category.update(data);
    }    
    return category;
}

const deleteCategory = async (id) => {
    const result = await Category.destroy({where: {id}})
    return result;
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}