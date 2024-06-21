const brandController = require('../controllers/brandController')
const router = require('express').Router()

// !GET
router.get('/', brandController.getAllBrands)
router.get('/:id', brandController.getBrandById)

// ! CREATE
router.post('/', brandController.createNewBrand)

// ! UPDATE
router.put('/:id', brandController.updateBrandById)

// ! DELETE
router.delete('/:id', brandController.deleteBrandById)

module.exports = router