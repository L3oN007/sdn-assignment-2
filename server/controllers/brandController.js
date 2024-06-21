const { Brand } = require('../models/model')
const brandValidator = require('../validators/brand')
const { validationResult } = require('express-validator');


const brandController = {
    getAllBrands: async (req, res) => {
        try {
            const brands = await Brand.find()
            return res.status(200).json({
                message: "Success",
                response: brands
            })
        } catch (error) {
            console.log("Get all brands error: ", error)
            res.status(400).json({
                message: "Bad request"
            })
        }
    },
    getBrandById: async (req, res) => {
        try {
            const brand = await Brand.findById(req.params.id)
            return res.status(200).json({
                message: "Success",
                response: brand
            })
        } catch (error) {
            console.log("Get brand by id error: ", error)
            res.status(400).json({
                message: "Bad request"
            })
        }
    },
    createNewBrand: [
        brandValidator(),
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: errors.array().map(err => err.msg).join(', ')
                });
            }

            const { brandName } = req.body
            try {
                const existBrand = await Brand.findOne({ brandName })
                if (existBrand) {
                    return res.status(400).json({
                        success: false,
                        message: "Brand already exists"
                    });
                }
                const newBrand = new Brand({
                    brandName
                })

                await newBrand.save();

                return res.status(200).json({
                    success: true,
                    message: "Brand created successfully"
                })
            } catch (error) {
                console.log("Create brand error: ", error)
                return res.status(500).json({
                    success: false,
                    message: "Internal server error"
                });
            }
        }],
    updateBrandById: [
        brandValidator(),
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: errors.array().map(err => err.msg).join(', ')
                });
            }

            const { brandName } = req.body
            const { id } = req.params
            try {
                const existBrand = await Brand.findOne({ brandName })
                if (existBrand) {
                    return res.status(400).json({
                        success: false,
                        message: "Brand name already exists"
                    });
                }
                await Brand.findByIdAndUpdate(id, { brandName }, { new: true })
                return res.status(200).json({
                    success: true,
                    message: "Brand updated successfully",
                })
            } catch (error) {
                console.log("Update brand error: ", error)
                return res.status(500).json({
                    success: false,
                    message: "Internal server error"
                });
            }
        }
    ],
    deleteBrandById: async (req, res) => {
        const { id } = req.params
        try {
            await Brand.findByIdAndDelete(id)
            return res.status(200).json({
                success: true,
                message: "Brand deleted successfully",
            })
        } catch (error) {
            console.log("Delete brand error: ", error)
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    }
}

module.exports = brandController