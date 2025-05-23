import mongoose from "mongoose";
 
const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
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

