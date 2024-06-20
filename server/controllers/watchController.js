const { Watch } = require('../models/model')

const watchController = {
    getAllWatches: async (req, res) => {
        try {
            const watches = await Watch.find()
            return res.status(200).json({
                message: "Success",
                response: watches
            })
        } catch (error) {
            console.log("Get all watches error: ", error)
            res.status(400).json({
                message: "Bad request"
            })
        }

    },
}

module.exports = watchController