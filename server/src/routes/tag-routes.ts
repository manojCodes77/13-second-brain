import express,{ Express,Request,Response } from "express";
import { userMiddleware } from "../middlewares/auth";
import Tag from "../models/tag-model";

const router = express.Router();

// router.use(userMiddleware);
router.post("/", async (req: Request, res: Response) => {
    const { title } = req.body;
    try {
        const tag = new Tag({
            title: title
        });
        await tag.save();
        res.status(201).json({ message: "Tag created successfully", tag });
    } catch (error:any) {
        res.status(400).json({ error: error.message });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const tag = await Tag.findByIdAndDelete(id);
        if (!tag) {
            res.status(404).json({ message: "Tag not found" });
            return;
        }
        res.status(200).json({ message: "Tag deleted successfully" });
    }
    catch (error:any) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
//     res.status(200).json({ message: "Content updated successfully", content });