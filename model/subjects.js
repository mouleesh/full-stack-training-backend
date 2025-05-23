import mongoose from "mongoose";
 
const subjectSchema = new mongoose.Schema({
    name: {
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
    }
});
 
const subjectModal = mongoose.model("subjects", subjectSchema);

export default subjectModal;

