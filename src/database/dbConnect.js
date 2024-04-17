import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Database connection successful');
    } catch (error) {
        console.log('Database connection failed');
    }
}

export default dbConnect;