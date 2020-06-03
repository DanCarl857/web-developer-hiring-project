const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

function toLower(v) {
    return v.toLowerCase();
}

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        set: toLower
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
    properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property'}]
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

userSchema.pre('save', function(next, err) {

    var user = this;
   
    // If user is not new or the password is not modified
    if (!user.isNew && !user.isModified('password')) {
      return next();
    }
   
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) 
          return next(err);
        user.password = hash;
        next();
    });
});

const User = mongoose.model('User', userSchema);
module.exports = { User }