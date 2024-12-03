"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOrCreateConversation = exports.fetchAllConversationsByUserId = void 0;
const db_1 = __importDefault(require("../models/db"));
const fetchAllConversationsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = null;
    if (req.user) {
        userId = req.user.id;
    }
    try {
        const result = yield db_1.default.query(`
            SELECT 
                c.id AS conversation_id,
                CASE 
                    WHEN u1.id = $1 THEN u2.username
                    ELSE u1.username
                END AS participant_name,
                m.content AS last_message,
                m.created_at AS last_message_time
            FROM conversations c
            JOIN users u1 ON u1.id = c.participant_one
            JOIN users u2 ON u2.id = c.participant_two
            LEFT JOIN LATERAL (
                SELECT content, created_at
                FROM messages 
                WHERE conversation_id = c.id
                ORDER BY created_at DESC
                LIMIT 1
            ) m ON true
            WHERE c.participant_one = $1 OR c.participant_two = $1
            Order BY m.created_at DESC
            `, [userId]);
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error fetching conversations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.fetchAllConversationsByUserId = fetchAllConversationsByUserId;
const checkOrCreateConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('checkOrCreateConversation');
    let userId = null;
    if (req.user) {
        userId = req.user.id;
    }
    const { contactId } = req.body;
    try {
        const existingConversation = yield db_1.default.query(`
            SELECT id FROM conversations
            WHERE (participant_one = $1 AND participant_two = $2)
                OR (participant_one = $2 AND participant_two = $1)
            LIMIT 1
            `, [userId, contactId]);
        if (existingConversation.rowCount != null && existingConversation.rowCount > 0) {
            res.json({ conversationId: existingConversation.rows[0].id });
            return;
        }
        const newConversation = yield db_1.default.query(`
            INSERT INTO conversations (participant_one, participant_two)
            VALUES ($1, $2)
            RETURNING id
            `, [userId, contactId]);
        res.json({ conversationId: newConversation.rows[0].id });
    }
    catch (error) {
        console.error('Error checking conversation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.checkOrCreateConversation = checkOrCreateConversation;
