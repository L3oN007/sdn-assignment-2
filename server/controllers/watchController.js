const { calculateAverageRating } = require('../lib/utils');
const { Watch } = require('../models/model')
const watchValidator = require('../validators/watch')
const { validationResult } = require('express-validator');


const watchController = {
    getAllWatches: async (req, res) => {
        try {
            const watches = await Watch.find()
            const watchesWithAvgRating = watches.map(watch => ({ watch, avgRating: calculateAverageRating(watch.comments) }))
            return res.status(200).json({
                message: "Success",
                response: watchesWithAvgRating
            })
        } catch (error) {
            console.log("Get all watches error: ", error)
            res.status(400).json({
                message: "Bad request"
            })
        }

    },
    getWatchById: async (req, res) => {
        try {
            const watch = await Watch.findById(req.params.id)
            const watchWithAvgRating = { watch, avgRating: calculateAverageRating(watch.comments) }
            return res.status(200).json({
                message: "Success",
                response: watchWithAvgRating
            })
        } catch (error) {
            console.log("Get watch by id error: ", error)
            res.status(400).json({
                message: "Bad request"
            })
        }
    },
    createNewWatch: [
        watchValidator(),
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: errors.array().map(err => err.msg).join(', ')
                });
            }
            const { watchName, image, price, watchDescription, automatic, brand } = req.body
            try {
                const existWatch = await Watch.findOne({ watchName })
                if (existWatch) {
                    return res.status(400).json({
                        success: false,
                        message: "Watch already exists"
                    });
                }
                const newWatch = new Watch({
                    watchName,
                    image,
                    price,
                    watchDescription,
                    automatic,
                    brand
                })

                await newWatch.save();

                return res.status(200).json({
                    success: true,
                    message: "Watch created successfully"
                })
            } catch (error) {
                console.log("Create watch error: ", error)
                return res.status(500).json({
                    success: false,
                    message: "Internal server error"
                })
            }
        }
    ],
    updateWatchById: [
        watchValidator(),
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: errors.array().map(err => err.msg).join(', ')
                });
            }
            const { watchName, image, price, watchDescription, automatic, brand } = req.body
            const { id } = req.params
            try {
                const existWatch = await Watch.findOne({ watchName })
                if (existWatch) {
                    return res.status(400).json({
                        success: false,
                        message: "Watch name already exists"
                    });
                }
                await Watch.findByIdAndUpdate(id, { watchName, image, price, watchDescription, automatic, brand }, { new: true })
                return res.status(200).json({
                    success: true,
                    message: "Watch updated successfully",
                })
            } catch (error) {
                console.log("Update watch error: ", error)
                return res.status(500).json({
                    success: false,
                    message: "Internal server error"
                })
            }
        }
    ],
    deleteWatchById: async (req, res) => {
        const { id } = req.params
        try {
            await Watch.findByIdAndDelete(id)
            return res.status(200).json({
                success: true,
                message: "Watch deleted successfully",
            })
        } catch (error) {
            console.log("Delete watch error: ", error)
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }
    }
}

module.exports = watchController