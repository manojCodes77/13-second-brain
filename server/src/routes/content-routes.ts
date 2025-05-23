import express, { Request, Response } from 'express';
import { userMiddleware } from '../middlewares/auth';
import Content from '../models/content-model';

const router = express.Router();

router.use(userMiddleware);

router.post("/", async (req: Request, res: Response) => {
    const { title, link, tags, type } = req.body;    
    try {
        const content = new Content({
            title,
            link,
            tags,
            type,
            userId: req.userId
        });
        await content.save();
        res.status(201).json({ message: "Content created successfully", content });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
})

router.get("/", async (req: Request, res: Response) => {
    try {
        const contents = await Content.find({ userId: req.userId }).populate("tags").populate("userId");
        if(!contents) {
            res.status(404).json({ message: "No content found" , contents: [] });
            return;
        }
        res.status(200).json({ contents });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
})

router.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const content = await Content.findByIdAndDelete(id);
        if (!content) {
            res.status(404).json({ message: "Content not found" });
            return;
        }
        res.status(200).json({ message: "Content deleted successfully" });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, link, tags, type } = req.body;
    try {
        const content = await Content.findByIdAndUpdate(id, {
            title,
            link,
            tags,
            type
        }, { new: true });
        if (!content) {
            res.status(404).json({ message: "Content not found" });
            return;
        }
        res.status(200).json({ message: "Content updated successfully", content });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

export default router;