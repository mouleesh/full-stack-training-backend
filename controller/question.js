import { Router } from "express";
import questionModal from './../model/questions.js';
import authMiddleware from "../middleware/authentication.js";

const router = Router();

// This API is used to get all the questions and if there is url param subject_id then it will filter the questions with that subject id
router.get('/questions', async (req, res) => {
    const { subject_id } = req.query;
    const filter = subject_id ? { subject: subject_id } : {};

    const questions = await questionModal.find(filter).populate('subject').populate('topic');
    res.json(questions)
})

// This API is used create a new question
router.post('/questions', authMiddleware, authorizeRoles('admin', 'contributor'), async (req, res) => { 
    const { title, question, answer, subject, topic, codeSnippet, example, difficulty } = req.body;
    const newQuestion = new questionModal({
        title,
        question,
        answer,
        subject,
        topic,
        codeSnippet,
        example,
        difficulty
    });

    await newQuestion.save();
    const populatedQuestion = await questionModal.findById(newQuestion._id).populate('subject').populate('topic');
    res.status(201).json(populatedQuestion);
});

// This API is used for updating a question with a given id
router.put('/questions/:id', authMiddleware, authorizeRoles('admin', 'contributor'), async (req, res) => {
    const { title, question, answer, subject, topic, codeSnippet, example, difficulty } = req.body;
    const updatedQuestion = await questionModal.findByIdAndUpdate(
        req.params.id,
        {   
            title,
            question,
            answer,
            subject,
            topic,
            codeSnippet,
            example,
            difficulty
        },
        { new: true }
    ).populate('subject').populate('topic');

    if (!updatedQuestion) {
        return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json(updatedQuestion);
});

// This API is used for deleting a question with a given id
router.delete('/questions/:id', authMiddleware, authorizeRoles('admin', 'contributor'), async (req, res) => {
    const deletedQuestion = await questionModal.findByIdAndDelete(req.params.id);
    if (!deletedQuestion) {
        return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json({ message: "Question deleted successfully" });
});

export default router;