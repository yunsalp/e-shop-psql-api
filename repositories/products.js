const Product = require('../models/product');
const Category = require('../models/category');
const Brand = require('../models/brand');

queryOption = {attributes: {exclude: ['category_id', 'brand_id']}, 
                include: [{model: Category}, {model: Brand}]};

const getAllProducts = async () => {
    const products = await Product.findAll(queryOption);
    return products;
}

const getProductById = async (id) => {
    const product = await Product.findByPk(id, queryOption);
    return product;
}

const appendCategoryAndBrand = async (product) => {    
    product.setDataValue("category", await product.getCategory());
    product.setDataValue("brand", await product.getBrand());
    delete product.dataValues.category_id;
    delete product.dataValues.brand_id;
    return product;
}

const createProduct = async (data) => {
    const product = await Product.create(data);
    if (product !== null) {
        product = appendCategoryAndBrand(product);
    }
    return product;
}

const updateProduct = async (id, data) => {
    let product = await Product.findByPk(id);
    if (product !== null) {
        product = await product.update(data);
        product = appendCategoryAndBrand(product);
    }    
    return product;
}

const deleteProduct = async (id) => {
    const result = await Product.destroy({where: {id}})
    return result;
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}