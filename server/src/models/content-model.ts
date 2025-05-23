import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
    },
    tags:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
    }],
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    type:{
        type: String,
        enum: ["youtube","instagram","twitter","linkedin","other"],
        required: true,
    }
});

const Content = mongoose.model("Content", contentSchema);
export default Content;