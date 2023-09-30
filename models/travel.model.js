const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        weight: {
            type: Number,
            min:1,
            max: 50,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        startingPoint: {
            type: String,
            required: true,
        },
        destination: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        }

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
    }
)

const Travel = mongoose.model('Travel', travelSchema);

module.exports = Travel;