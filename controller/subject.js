import { Router } from "express";
import topicModal from "../model/topics.js";
import subjectModal from "../model/subjects.js";

const router = Router();

// This API is used to get all the subjects
router.get('/subjects', async (req, res) => {
    const subjects = await subjectModal.find();
    const topics = await topicModal.find({ subject: { $in: subjects.map((sub) => sub._id) } });
    const subjectsAndTopics = subjects.map((sub) => ({
        ...sub.toJSON(),
        topics: topics.filter((topic) => topic.subject.toString() === sub._id.toString()),
    }));

    res.json(subjectsAndTopics);
})

// This API is used for creating a new subject and creating multiple topics with the created subject id.
router.post('/subjects', async (req, res) => {
    const { name, topics } = req.body;
    const subjectInstance = new subjectModal({ name });
    const subject = await subjectInstance.save();
    if (!subject) {
        return res.status(400).json({ message: "Failed to create subject" });
    }

    const topicData = topics.map((topic) => ({ name: topic, subject: subject._id }));
    await topicModal.insertMany(topicData);
    res.json({ 
        message: "Subject and topics created successfully", 
        data: { ...subject._doc, topics: topicData } 
    });
});

// This API is used for updating a subject for given subject id in the path and then it udpates all the topics found in the body. if there are any new topics then it creates them.
router.put('/subjects/:id', async (req, res) => {
    const { name, topics } = req.body;
    const subject = await subjectModal.findByIdAndUpdate(
        req.params.id,
        { name },
        { new: true }
    );
    if (!subject) {
        return res.status(404).json({ message: "Subject not found" });
    }

    const topicData = topics.map((topic) => ({ name: topic, subject: subject._id }));
    await topicModal.deleteMany({ subject: subject._id });
    await topicModal.insertMany(topicData);
    res.json({ 
        message: "Subject and topics updated successfully", 
        data: { ...subject._doc, topics: topicData } 
    });
});

//This API is used for deleting a subject with a given id and all the topics related to that subject.
router.delete('/subjects/:id', async (req, res) => {
    const subject = await subjectModal.findByIdAndDelete(req.params.id);
    if (!subject) {
        return res.status(404).json({ message: "Subject not found" });
    }
    await topicModal.deleteMany({ subject: req.params.id });
    res.json({ message: "Subject and topics deleted successfully" });
});

export default router;