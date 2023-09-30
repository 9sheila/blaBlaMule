const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
    currentUser: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    message: {
        type: String,
        required: true,
        required: "Comment is required",
    },
    points: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now,
    },

},
{
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = doc.id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
})

const Reviews = mongoose.model('Reviews', ratingSchema)

module.exports = Reviews;