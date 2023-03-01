const mongoose = require('mongoose');

let UserModel;

try {
    UserModel = mongoose.model('User');
} catch (error) {
    const userSchema = new mongoose.Schema({
        username: String,
        password: String,
        token: String
    });

    UserModel = mongoose.model('User', userSchema);
}

module.exports = UserModel;