const dns = require('node:dns');

dns.setServers([
    '8.8.8.8',
    '8.8.4.4',
    '1.1.1.1'
]);

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongo_uri);
        console.log("DB connected");
    } catch (error) {
        console.error('Database connection error');
    }
}

module.exports = connectDB;

