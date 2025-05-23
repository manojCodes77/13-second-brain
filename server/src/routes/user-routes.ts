import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import User from '../models/user-model';

const router = express.Router();

router.post('/signup', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = new User({ email, password });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error: any) {
        if (error.code === 11000) {
            res.status(400).json({ error: "Email already exists" });
            return;
        }
        res.status(400).json({ error: error.message });
        return;
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found, please Sign Up first !' });
            return;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
        res.status(200).json({ token });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;