import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const PropertyModel = mongoose.model('Property', propertySchema);
export default PropertyModel;