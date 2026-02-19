const dns = require('node:dns');

// Set the DNS servers to Google (8.8.8.8) and Cloudflare (1.1.1.1)
dns.setServers([
    '8.8.8.8',
    '8.8.4.4',
    '1.1.1.1'
]);


const mongoose = require('mongoose');

async function connectDB() {
    await mongoose.connect(process.env.mongo_uri);
    console.log("Connected to DB");
}

module.exports = connectDB;
