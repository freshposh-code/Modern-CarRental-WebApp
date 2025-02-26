import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    carId: { type: String, required: true }, 
    carName: { type: String, required: true },
    carImg: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: [
        'pending',      // Initial booking state
        'confirmed',    // Booking approved
        'in_progress',  // Car picked up
        'completed',    // Car returned
        'cancelled',    // Booking cancelled
        'rejected'      // Booking denied
      ],
      default: 'pending'
    },
    statusHistory: [{
      status: String,
      timestamp: { type: Date, default: Date.now },
      updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }]
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
