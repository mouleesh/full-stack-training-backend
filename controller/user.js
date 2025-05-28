import { Router } from "express";
import userModal from './../model/users.js';
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constant.js";
import authMiddleware from "../middleware/authentication.js";
import authorizeRoles from "../middleware/authorizeRole.js";

const router = Router();

// This API is used for login
router.post('/login', async (req, res) => { 
    const { mobile, password } = req.body;

    const user = await userModal.find({ mobile, password });
    
    if (user.length === 0) {
        return res.status(401).json({ message: "Invalid username or password" });
    } else {
        // If the user is found, generate a jwt token and send it back to the client
        const token = jwt.sign({ id: user._id, name: user.name, role: user.role }, JWT_SECRET, { expiresIn: '365d' });
        res.status(200).json({ token });
    }
});

//This API returns all the users
router.get('/users', authMiddleware, authorizeRoles('admin'), async (req, res) => {
    try {
        const users = await userModal.find({}).select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
});

//This API is used to create a new user
router.post('/users', async (req, res) => {
    const { name, password, mobile, email, role, status } = req.body;

    // Check if the user already exists
    const existingUser = await userModal.findOne({
        mobile: mobile
    });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }
    // Create a new user
    const newUser = new userModal({
        name,
        password,
        mobile,
        email,
        role,
        status
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json({ message: "User created successfully", data: savedUser });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }

}); 

//This API is used to update an existing user by patching some fields not all
router.patch('/users/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Remove fields that should not be updated directly (like _id)
        delete updateData._id;

        const updatedUser = await userModal.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
})

//This API is used to delete a user by id
router.delete('/users/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await userModal.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully"});
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
});

export default router;