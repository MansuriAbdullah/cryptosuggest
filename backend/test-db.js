import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const testDB = async () => {
    try {
        console.log('Connecting to:', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Successfully connected to MongoDB');
        process.exit(0);
    } catch (err) {
        console.error('Connection failed:', err);
        process.exit(1);
    }
};

testDB();
