import { Router } from "express";
import contactFormModel from "../model/contactForm.js";

const router = Router();

// This API is used to get all the contact requests.
router.get('/contact-form', async (req, res) => {
    try {
        const contactRequests = await contactFormModel.find({}).sort({ createdAt: -1 });
        res.status(200).json(contactRequests);
    } catch (error) {
        res.status(500).json({ message: "Error fetching contact requests", error: error.message });
    }
});

// This API is used to create a new contact request.
router.post('/contact-form', async (req, res) => {
    const { name, email, mobile, message } = req.body;

    // Validate required fields
    if (!name || !email || !mobile || !message) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newContactRequest = new contactFormModel({
        name,
        email,
        mobile,
        message,
        status: "new", 
    });

    try {
        const savedContactRequest = await newContactRequest.save();
        res.status(201).json({ message: "Contact request created successfully", data: savedContactRequest });
    } catch (error) {
        res.status(500).json({ message: "Error creating contact request", error });
    }
});

// This API is used to update the status of a contact request.
router.patch('/contact-form/:id', async (req, res) => {
    const { status } = req.body;

    // Validate status field
    if (!status) {
        return res.status(400).json({ message: "Status is required" });
    }

    try {
        const updatedContactRequest = await contactFormModel.findByIdAndUpdate(
            req.params.id,
            { status, updatedAt: Date.now() },
            { new: true }
        );

        if (!updatedContactRequest) {
            return res.status(404).json({ message: "Contact request not found" });
        }

        res.status(200).json({ message: "Contact request updated successfully", data: updatedContactRequest });
    } catch (error) {
        res.status(500).json({ message: "Error updating contact request", error });
    }
});

export default router;