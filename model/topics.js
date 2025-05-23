import mongoose from "mongoose";
 
const topicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subjects",
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
 
const topicModal = mongoose.model("topics", topicSchema);

export default topicModal;

