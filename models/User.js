const { Schema, model } = require('mongoose');
const validator = require('validator');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: 'Email address is required',
        unique: true,
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
        }
    }
});

// create the User model using UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;