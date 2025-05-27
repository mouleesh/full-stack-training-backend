import mongoose from "mongoose";
 
const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: false, // Made optional to allow questions without a detailed description
    },
    answer: {
        type: String,
        required: true,
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subjects",
        required: true,
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "topics",
        required: true,
    },
    codeSnippet: {
        type: String,
        required: false,
    },
    example: {
        type: String,
        required: false,
    },
    difficulty: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        default: "medium",
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
 
const questionModal = mongoose.model("questions", questionSchema);

export default questionModal;

