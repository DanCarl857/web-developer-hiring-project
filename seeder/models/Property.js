const mongoose = require('mongoose');

function toLower(v) {
    return v.toLwerCase();
}

const propertySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    contact: {
        type: String,
        required: true
    },
    inspected: {
        type: Boolean,
        required: true
    },
    inspection: {
        type: String
    },
    comment: {
        type: String,
        enum: ['DEFECTIVE', 'NEUTRAL', 'GOOD'],
        default: 'NEUTRAL'
    },
    rating: {
        type: Number,
    },
    company: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Property = mongoose.model('Property', propertySchema);
module.exports = { Property }