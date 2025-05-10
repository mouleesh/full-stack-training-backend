import mongoose from "mongoose";
 
const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});
 
const subjectModal = mongoose.model("subjects", subjectSchema);

export default subjectModal;

