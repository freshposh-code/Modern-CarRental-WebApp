import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema({
    carName: {
        type: String,
        require: true
    },
    
    carImage: [] ,

    price: {
        type: Number,
        require: true 
    },
},
    { timestamps: true }
);

export default mongoose.models.Wishlist || mongoose.model('Wishlist', WishlistSchema);