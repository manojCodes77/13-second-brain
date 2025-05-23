import express ,{ Express, Request, Response } from "express";
import { userMiddleware } from "../middlewares/auth";
import Link from "../models/link-model";
import Content from "../models/content-model";

const router = express.Router();

const generateHash=async()=>{
    // generate a 10 character hash
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let hash = '';
    for (let i = 0; i < 10; i++) {
        hash += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return hash;
}

router.use(userMiddleware);
router.post("/", async (req: Request, res: Response) => {
    const {share}=req.body;
    if(share){
        const existingLink = await Link.findOne({userId: req.userId});
        if (existingLink) {
            res.status(400).json({ message: "Link already exists", existingLink:existingLink.hash });
            return;
        }
        const hash= await generateHash();
        const link = new Link({
            userId: req.userId,
            hash: hash,
        });
        await link.save();
        res.status(201).json({ message: "Link created successfully", link: await link.populate("userId") });
    }
    // else delete the link
    else{
        const existingLink = await Link.findOne({userId: req.userId});
        if (!existingLink) {
            res.status(400).json({ message: "Link does not exist" });
            return;
        }
        await Link.findByIdAndDelete(existingLink._id);
        res.status(200).json({ message: "Link deleted successfully" });
    }
    return;
});

router.get("/:link", async (req: Request, res: Response) => {
    const { link } = req.params;
    try {
        const existingLink = await Link.findOne({hash:link});
        if (!existingLink) {
            res.status(400).json({ message: "Link does not exist" });
            return;
        }
        const content=await Content.find({userId: existingLink.userId}).populate("tags").populate("userId");
        res.status(200).json({ message: "Link exists", link:(await existingLink.populate("userId")), content });
    } catch (error:any) {
        res.status(400).json({ error: error.message });
    }
});

export default router;