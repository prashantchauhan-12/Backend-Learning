const dns = require('node:dns');

// Set the DNS servers to Google (8.8.8.8) and Cloudflare (1.1.1.1)
dns.setServers([
    '8.8.8.8',
    '8.8.4.4',
    '1.1.1.1'
]);

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongo_uri)
        console.log("DB connected")
    }
    catch (err) {
        console.error("database connection error")
    }
}

module.exports = connectDB;


