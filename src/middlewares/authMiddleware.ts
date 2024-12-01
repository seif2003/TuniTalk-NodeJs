import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) {
        res.status(401).json({error: 'No token provided'});
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'change_this_secret');
        req.user = decoded as {id: string};
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({error: 'Unauthorized'});
    }
}