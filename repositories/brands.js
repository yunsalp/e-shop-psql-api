const Brand = require('../models/brand');

const getAllBrands = async () => {
    const brands = await Brand.findAll();
    return brands;
}

const getBrandById = async (id) => {
    const brand = await Brand.findByPk(id);
    return brand;
}

const createBrand = async (data) => {
    const brand = await Brand.create(data);
    return brand;
}

const updateBrand = async (id, data) => {
    let brand = await Brand.findByPk(id);
    if (brand !== null) {
        brand = await brand.update(data);
    }    
    return brand;
}

const deleteBrand = async (id) => {
    const result = await Brand.destroy({where: {id}})
    return result;
}

module.exports = {
    getAllBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand
}