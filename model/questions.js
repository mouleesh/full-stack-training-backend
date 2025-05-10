import mongoose from "mongoose";
 
const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    }
});
 
const questionModal = mongoose.model("questions", questionSchema);

export default questionModal;

