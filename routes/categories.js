const express = require('express');
const categoriesController = require('../controllers/categories');
//const {verifyTokenHandler, verifyRoles} = require('../middlewares/jwtHandler');

const router = express.Router();

router.get('/', categoriesController.getAllCategories);
router.get('/:id', categoriesController.getCategoryById);
// router.post('/', [verifyTokenHandler, verifyRoles(['Admin'])], categoriesController.createCategory);
// router.patch('/:id', [verifyTokenHandler, verifyRoles(['Admin'])], categoriesController.updateCategory);
// router.delete('/:id', [verifyTokenHandler, verifyRoles(['Admin'])], categoriesController.deleteCategory);
router.post('/', categoriesController.createCategory);
router.patch('/:id', categoriesController.updateCategory);
router.delete('/:id', categoriesController.deleteCategory);

module.exports = router;