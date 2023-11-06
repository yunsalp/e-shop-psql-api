const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const productsRepository = require('../repositories/products');

const getAllProducts = asyncHandler(async (req, res, next) => {
    const result = await productsRepository.getAllProducts();
    res.status(200).json(result);
});

const getProductById = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const result = await productsRepository.getProductById(id);
    if (result == null) {
        return next(new ErrorResponse(`Product doesn't exist with id: ${id}`, 404));
    }
    res.status(200).json(result);
});

const createProduct = asyncHandler(async (req, res, next) => {
    const data = req.body;
    const result = await productsRepository.createProduct(data);
    res.status(201).json(result);
});

const updateProduct = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    const result = await productsRepository.updateProduct(id, data);
    if (result == null) {
        return next(new ErrorResponse(`Product doesn't exist with id: ${id}`, 404));
    }
    res.status(200).json(result);
});

const deleteProduct = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const result = await productsRepository.deleteProduct(id);
    if (result == null || result < 1) {
        return next(new ErrorResponse(`Product doesn't exist with id: ${id}`, 404));
    }
    res.status(200).json({message: 'Product deleted successfully'});
});

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}
