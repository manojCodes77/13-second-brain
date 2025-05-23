import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header) {
        res.status(403).json({
            message: "You are not logged in"
        })
        return;
    }
    try {
        const decoded = jwt.verify(header as string, process.env.JWT_SECRET as string);

        if (typeof decoded === "string") {
            // This case is unusual for standard JWTs but good to handle
            res.status(403).json({
                message: "Invalid token format"
            });
            return;
        }

        // Assuming your decoded payload has an id property
        // Correctly access 'id' from the decoded token based on how it was signed
        const userIdFromToken = (decoded as any).id; 

        if (!userIdFromToken) {
            res.status(403).json({
                message: "Token payload is invalid or missing user identifier (id)"
            });
            return;
        }
        req.userId = userIdFromToken; 
        next();

    } catch (error) {
        res.status(403).json({
            message: "You are not logged in"
        });
        return;
    }
}