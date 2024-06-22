const { calculateAverageRating } = require('../lib/utils');
const { Watch } = require('../models/model');
const commentValidator = require('../validators/comment');
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
    },
    deleteCommentById: async (req, res) => {
        const { watchId, commentId } = req.params
        try {
            const watch = await Watch.findById(watchId)
            if (!watch) {
                return res.status(400).json({
                    success: false,
                    message: "Watch not found"
                });
            }

            // Find the comment to be deleted
            const comment = watch.comments.id(commentId);
            if (!comment) {
                return res.status(404).json({
                    success: false,
                    message: "Comment not found"
                });
            }

            if (comment.author.toString() !== req.user._id.toString()) {
                return res.status(403).json({
                    success: false,
                    message: "You are not authorized to delete this comment"
                });
            }

            // Delete the comment
            comment.remove();
            await watch.save();
            return res.status(200).json({
                success: true,
                message: "Comment deleted successfully",
            })
        } catch (error) {
            console.log("Delete comment error: ", error)
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }
    },
    createComment: [
        commentValidator(),
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: errors.array().map(err => err.msg).join(', ')
                });
            }
            const { watchId } = req.params
            const { content, rating } = req.body
            try {
                const watch = await Watch.findById(watchId)
                if (!watch) {
                    return res.status(400).json({
                        success: false,
                        message: "Watch not found"
                    });
                }

                const userHasCommented = watch.comments.some(comment => comment.author.equals(req.user._id));
                if (userHasCommented) {
                    return res.status(400).json({
                        success: false,
                        message: "You can only comment once"
                    });
                }
                const newComment = new Comment({
                    content,
                    rating,
                    author: req.user._id
                });
                watch.comments.push(newComment);
                await watch.save();
                return res.status(200).json({
                    success: true,
                    message: "Comment created successfully",
                    response: newComment
                })
            } catch (error) {
                console.log("Create comment error: ", error)
                return res.status(500).json({
                    success: false,
                    message: "Internal server error"
                });
            }
        }
    ],
    getAllCommentsByWatchId: async (req, res) => {
        const { watchId } = req.params
        try {
            const watch = await Watch.findById(watchId)
            if (!watch) {
                return res.status(400).json({
                    success: false,
                    message: "Watch not found"
                });
            }
            return res.status(200).json({
                success: true,
                message: "Success",
                response: watch.comments
            })
        } catch (error) {
            console.log("Get all comments error: ", error)
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    },
    updateComment: [
        commentValidator(),
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: errors.array().map(err => err.msg).join(', ')
                });
            }
            const { watchId, commentId } = req.params
            const { content, rating } = req.body
            try {
                const watch = await Watch.findById(watchId)
                if (!watch) {
                    return res.status(400).json({
                        success: false,
                        message: "Watch not found"
                    });
                }

                // Find the comment to be updated
                const comment = watch.comments.id(commentId);
                if (!comment) {
                    return res.status(404).json({
                        success: false,
                        message: "Comment not found"
                    });
                }
                if (comment.author.toString() !== req.user._id.toString()) {
                    return res.status(403).json({
                        success: false,
                        message: "You are not authorized to update this comment"
                    });
                }
                comment.content = content
                comment.rating = rating
                await watch.save();
                return res.status(200).json({
                    success: true,
                    message: "Comment updated successfully",
                })
            } catch (error) {
                console.log("Update comment error: ", error)
                return res.status(500).json({
                    success: false,
                    message: "Internal server error"
                });
            }
        }
    ]
}

module.exports = watchController