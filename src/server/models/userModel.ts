import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please provide name"],
    },
    email: {
        type: String,
        require: [true, "Please provide email address"],
        unique: true
    },
    password: {
        type: String,
        require: [true, "Please provide password"],
    },
    role: {
        type: String,
    }
},
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);