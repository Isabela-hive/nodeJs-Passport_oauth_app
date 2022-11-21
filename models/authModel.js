const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: String,
    googleId: String,
    thumbnail: String,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
