import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        name: string;
        email: string;
        password: string;
        // _id: ObjectId;
        // __v: number;
      };
    }
  }
}
