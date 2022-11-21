const mongoose = require('mongoose');
const connectDB = async (url) => {
    mongoose.connect(url);
    const db = mongoose.connection;
    db.once('error', console.error.bind(console, 'MongoDb  connection error'));
};

module.exports = connectDB;
