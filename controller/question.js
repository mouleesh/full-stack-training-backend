import { Router } from "express";
import questionModal from './../model/questions.js';

const router = Router();

// This API is used to get all the questions
router.get('/questions', async (req, res) => {
    const questions = await questionModal.find({}).populate('subject').populate('topic');
    res.json(questions)
})

// This API is used create a new question
router.post('/questions', async (req, res) => { 
    const { question, answer, subject, topic, codeSnippet, example } = req.body;
    const newQuestion = new questionModal({
        question,
        answer,
        subject,
        topic,
        codeSnippet,
        example
    });

    await newQuestion.save();
    res.status(201).json(newQuestion);
});

// This API is used for updating a question with a given id
router.put('/questions/:id', async (req, res) => {
    const { question, answer, subject, topic } = req.body;
    const updatedQuestion = await questionModal.findByIdAndUpdate(
        req.params.id,
        {
            question,
        },
        { new: true }
    );
    if (!updatedQuestion) {
        return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json(updatedQuestion);
});

// This API is used for deleting a question with a given id
router.delete('/questions/:id', async (req, res) => {
    const deletedQuestion = await questionModal.findByIdAndDelete(req.params.id);
    if (!deletedQuestion) {
        return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json({ message: "Question deleted successfully" });
});

export default router;