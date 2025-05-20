import { Router } from "express";
import userModal from './../model/users.js';
import jwt from "jsonwebtoken";

const router = Router();


// This API is used for login
router.post('/login', async (req, res) => { 
    const { username, password } = req.body;

    const user = await userModal.find({ username, password });
    
    if (user.length === 0) {
        return res.status(401).json({ message: "Invalid username or password" });
    } else {
        // If the user is found, generate a jwt token and send it back to the client
        const token = jwt.sign({ id: user._id, username: username }, "SECRET", { expiresIn: '365d' });
        res.status(200).json({ token });
    }
    
});

export default router;