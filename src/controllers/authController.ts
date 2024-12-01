import { Request,Response } from "express";
import pool from "../models/db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALTED_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

export const register = async (req: Request, res: Response) => {
    // 1. get the username, email, password
    // 2. Insert those data into the database
    // 3. Return message, user

    const {username, email, password} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, SALTED_ROUNDS);
        const result = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, hashedPassword]);
        const user = result.rows[0];
        res.status(201).json({message: 'User registered successfully', user});
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
}

export const login = async (req: Request, res: Response) => {
    // 1. get email, password
    // 2. Verify if the email exists in the database
    // 3. Compare the password -> 'invalid credentials'
    // 4. return token
}