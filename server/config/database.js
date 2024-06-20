const mongoose = require('mongoose');

/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 * 
 * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
 * DB_STRING_PROD=<your production database string>
 */

const connectionString = "mongodb://localhost:27017/ass-1";

const connectDB = async () => {
    try {
        await mongoose.connect(connectionString);
        console.log('🟢👍 Database connected');
    } catch (error) {
        console.error('🔴 Database connection error:', error.message);
        process.exit(1);
    }
};

mongoose.connection.on('error', (error) => {
    console.error('🔴 Database connection error:', error.message);
});

mongoose.connection.on('disconnected', () => {
    console.log('🔴 Database disconnected');
});

module.exports = connectDB;





