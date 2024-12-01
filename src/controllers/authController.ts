import { Request,Response } from "express";
import pool from "../models/db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALTED_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

export const register = async (req: Request, res: Response) => {
    const {username, email, password} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, SALTED_ROUNDS);
        const result = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, hashedPassword]);
        const user = result.rows[0];
        res.status(201).json({user});
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({error: 'Internal server error'});
    }
}

export const login = async (req: Request, res: Response): Promise<any> => {
    const {email, password} = req.body;
    try{
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];
        if(!user) {
            return res.status(404).json({error: 'User not found'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({error: 'Invalid credentials'});
        }
        const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: '10h'});
        res.json({message: 'User logged in successfully', token});
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({error: 'Internal server error'});
    }
}