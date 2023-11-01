const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const categoriesRepository = require('../repositories/categories');

const getAllCategories = asyncHandler(async (req, res, next) => {
    const result = await categoriesRepository.getAllCategories();
    res.status(200).json(result);
});

const getCategoryById = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const result = await categoriesRepository.getCategoryById(id);
    if (result == null) {
        return next(new ErrorResponse(`Category doesn't exist with id: ${id}`, 404))
    }
    res.status(200).json(result);
});

const createCategory = asyncHandler(async (req, res, next) => {
    const data = req.body;
    const result = await categoriesRepository.createCategory(data);
    res.status(201).json(result);
});

const updateCategory = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    const result = await categoriesRepository.updateCategory(id, data);
    if (result === null) {
        return next(new ErrorResponse(`Category doesn't exist with id: ${id}`, 404))
    }
    res.status(200).json(result);
});

const deleteCategory = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const result = await categoriesRepository.deleteCategory(id);
    if (result === null || result < 1) {
        return next(new ErrorResponse(`Category doesn't exist with id: ${id}`, 404))
    }
    res.status(200).json({message: 'Category deleted successfully'});
});

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}