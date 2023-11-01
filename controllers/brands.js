const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const brandsRepository = require('../repositories/brands');

const getAllBrands = asyncHandler(async (req, res, next) => {
    const result = await brandsRepository.getAllBrands();
    res.status(200).json(result);
});

const getBrandById = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const result = await brandsRepository.getBrandById(id);
    if (result == null) {
        return next(new ErrorResponse(`Brand doesn't exist with id: ${id}`, 404));
    }
    res.status(200).json(result);
});

const createBrand = asyncHandler(async (req, res, next) => {
    const data = req.body;
    const result = await brandsRepository.createBrand(data);
    res.status(201).json(result);
});

const updateBrand = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    const result = await brandsRepository.updateBrand(id, data);
    if (result == null) {
        return next(new ErrorResponse(`Brand doesn't exist with id: ${id}`, 404));
    }
    res.status(200).json(result);
});

const deleteBrand = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const result = await brandsRepository.deleteBrand(id);
    if (result == null || result < 1) {
        return next(new ErrorResponse(`Brand doesn't exist with id: ${id}`, 404));
    }
    res.status(200).json({message: 'Brand deleted successfully'});
});

module.exports = {
    getAllBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand
}

