const brandController = require('../controllers/brandController')
const router = require('express').Router()
const isAdmin = require('../lib/authMiddleware').isAdmin

// !GET
router.get('/', brandController.getAllBrands)
router.get('/:id', brandController.getBrandById)

// ! CREATE
router.post('/', isAdmin, brandController.createNewBrand)

// ! UPDATE
router.put('/:id', isAdmin, brandController.updateBrandById)

// ! DELETE
router.delete('/:id', isAdmin, brandController.deleteBrandById)

module.exports = router