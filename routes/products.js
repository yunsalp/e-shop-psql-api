const express = require('express');
const productsController = require('../controllers/products');
//const {verifyTokenHandler, verifyRoles} = require('../middlewares/jwtHandler');

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
// router.post('/', [verifyTokenHandler, verifyRoles(['Admin'])], productsController.createProduct);
// router.patch('/:id', [verifyTokenHandler, verifyRoles(['Admin'])], productsController.updateProduct);
// router.delete('/:id', [verifyTokenHandler, verifyRoles(['Admin'])], productsController.deleteProduct);
router.post('/', productsController.createProduct);
router.patch('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
