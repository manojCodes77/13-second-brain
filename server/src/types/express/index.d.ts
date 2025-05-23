// src/types/express/index.d.ts
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      /** The MongoDB ObjectID of the authenticated user */
      userId?: string;
    }
  }
}
