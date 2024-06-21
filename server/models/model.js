const mongoose = require('mongoose')

// Define schema for comments (embedded in watches)
const commentSchema = new mongoose.Schema(
    {
        rating: { type: Number, required: true, min: 1, max: 3 },
        content: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'members', required: true }
    },
    { timestamps: true }
)

// Define schema for members (separate collection)
const memberSchema = new mongoose.Schema(
    {
        memberName: { type: String, required: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false },
        name: { type: String, required: true },
        YOB: { type: Number, required: true },
    },
    { timestamps: true }
)

// Define schema for brands (separate collection)
const brandSchema = new mongoose.Schema(
    {
        brandName: { type: String, required: true }
    },
    { timestamps: true }
)

// Define schema for watches (with reference to brands and embedded comments)
const watchSchema = new mongoose.Schema(
    {
        watchName: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        automatic: { type: Boolean, default: false }, // Corrected typo (automatic)
        watchDescription: { type: String, required: true },
        comments: [commentSchema],
        brand: { type: mongoose.Schema.Types.ObjectId, ref: 'brands', required: true }
    },
    { timestamps: true }
)

// Create mongoose models for each schema
const Comment = mongoose.model('comments', commentSchema)
const Member = mongoose.model('members', memberSchema)
const Brand = mongoose.model('brands', brandSchema)
const Watch = mongoose.model('watches', watchSchema)

// Export the models for use in your application
module.exports = {
    Comment,
    Member,
    Brand,
    Watch
}
