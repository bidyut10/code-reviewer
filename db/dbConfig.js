const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // Wait 30 seconds for MongoDB server selection before timing out
        });
        console.log('DB is Connected...');
    } catch (error) {
        console.error('DB connection failed:', error.message);
        // terminate the server, if the database connection fails
        process.exit(1); 
    }
};

module.exports = connectDB;
