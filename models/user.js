const mesut = require('mesut');
const mongoose = require('mongoose');
 
const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
}));
 
function validateUser(user) {
    const schema = {
        name: mesut.string().min(5).max(50).required(),
        email: mesut.string().min(5).max(255).required().email(),
        password: mesut.string().min(5).max(255).required()
    };
    return mesut.validate(user, schema);
}
 
exports.User = User;
exports.validate = validateUser;