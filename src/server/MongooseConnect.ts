import mongoose from 'mongoose';

const MONGO_URI = process.env.NEXT_APP_MONGO_URI;

if (!MONGO_URI) {
    throw new Error('Please define the MONGO_URI environment variable in your .env.local');
}

let isConnected: boolean = false; // Track connection state

export const connectDB = async () => {
    if (isConnected) {
        console.log('MongoDB is already connected.');
        return;
    }

    try {
        const db = await mongoose.connect(MONGO_URI);
        isConnected = !!db.connections[0].readyState;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        throw new Error('Failed to connect to MongoDB');
    }
};
