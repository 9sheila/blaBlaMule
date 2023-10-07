const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    userSending: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userReceiving: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending' 
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
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;