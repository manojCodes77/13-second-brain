import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

// Define user interface
interface IUser {
    email: string;
    username?: string;
    password: string;
}

// Create a document interface extending the base interface and Mongoose Document
interface IUserDocument extends IUser, mongoose.Document {
    // Additional instance methods could be added here if needed
}

const userSchema = new mongoose.Schema<IUserDocument>({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v: string) {
                return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email format! Required format: xyz@example.some`
        }
    },
    username: { type: String },
    password: { type: String, required: true },
});

// encrypt password before saving and suppose email is xyz@example.some, then username will be xyz
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    if (!this.username) {
        this.username = this.email.split("@")[0];
    }
    next();
});

const User = mongoose.model("User", userSchema);

export default User;