import mongoose, { Schema } from "mongoose";

const WishlistSchema = new Schema({
  userId: { type: String, required: true },
  carName: {
    type: String,
    required: true,
  },
  carImage: {
    type: [String],
  },
  price: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.Wishlist || mongoose.model('Wishlist', WishlistSchema);
