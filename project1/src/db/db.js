const dns = require('node:dns');

// Set the DNS servers to Google (8.8.8.8) and Cloudflare (1.1.1.1)
dns.setServers([
  '8.8.8.8',
  '8.8.4.4',
  '1.1.1.1'
]);

// Now proceed with your regular MongoDB connection


const mongoose = require("mongoose");

mongo_uri = process.env.MONGO_URI;

const connectDB = async () => {
    await mongoose.connect(mongo_uri);
    console.log("connecte to DB");
}

module.exports = connectDB;
