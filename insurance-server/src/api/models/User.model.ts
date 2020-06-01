import mongoose from 'mongoose';
import User from './../interfaces/User.interface';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    },
    password: { type: String, required: true },
    name: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String,
    },
    phone: {
      type: String,
      unique: true,
      required: true
    },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;