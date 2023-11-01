const express = require('express');
const brandsController = require('../controllers/brands');
//const {verifyTokenHandler, verifyRoles} = require('../middlewares/jwtHandler');

const router = express.Router();

router.get('/', brandsController.getAllBrands);
router.get('/:id', brandsController.getBrandById);
// router.post('/', [verifyTokenHandler, verifyRoles(['Admin'])], brandsController.createBrand);
// router.patch('/:id', [verifyTokenHandler, verifyRoles(['Admin'])], brandsController.updateBrand);
// router.delete('/:id', [verifyTokenHandler, verifyRoles(['Admin'])], brandsController.deleteBrand);
router.post('/', brandsController.createBrand);
router.patch('/:id', brandsController.updateBrand);
router.delete('/:id', brandsController.deleteBrand);

module.exports = router;
