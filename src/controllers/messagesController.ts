import { Request, Response } from "express";
import pool from "../models/db";

export const fetchAllMessagesByConversationId = async (req: Request, res: Response) => {
    const { conversationId } = req.params;
    try {
        const result = await pool.query(
            `
            SELECT m.id, m.content, m.sender_id, m.conversation_id, m.created_at
            FROM messages m
            WHERE conversation_id = $1
            ORDER BY created_at ASC
            `,
            [conversationId]
        );

        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const saveMessage = async (conversationId:string, sendId:string, content:string) => {
    try {
        const result = await pool.query(
            `
            INSERT INTO messages (conversation_id, sender_id, content)
            VALUES ($1, $2, $3)
            RETURNING *
            `,
            [conversationId, sendId, content]
        );

        return result.rows[0];
    } catch (error) {
        console.error('Error saving message:', error);
        throw new Error('Error saving message');
    }
}