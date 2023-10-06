const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        travel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Travel'
        },
        weight: {
            type: Number,
            min:1,
            max: 56,
            required: true,
        },
        status: {
            type: String,
            enum: [ 'pending', 'accepted', 'done'],
            default: "pending"
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
    }
)

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;