import mongoose from "mongoose";

const VaultSchema = new mongoose.Schema({
    carName: {
        type: String,
        require: true
    },
    carType: {
        type: String,
        require: true 
    },
    category: {
        type: String,
        require: true 
    },
    
    carImage: [] ,

    capacity: {
        type: String,
        require: true 
    },
    transmission: {
        type: String,
        require: true 
    },
    passengers: {
        type: String,
        require: true 
    },
    price: {
        type: Number,
        require: true 
    },
    description: {
        type: String,
        require: true 
    },
},
    { timestamps: true }
);

export default mongoose.models.Vault || mongoose.model('Vault', VaultSchema);