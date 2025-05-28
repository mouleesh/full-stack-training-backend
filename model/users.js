import mongoose from "mongoose";
 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user", "contributor"],
    },
    status: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
 
const userModal = mongoose.model("users", userSchema);

export default userModal;

