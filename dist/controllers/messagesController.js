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
exports.saveMessage = exports.fetchAllMessagesByConversationId = void 0;
const db_1 = __importDefault(require("../models/db"));
const fetchAllMessagesByConversationId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { conversationId } = req.params;
    try {
        const result = yield db_1.default.query(`
            SELECT m.id, m.content, m.sender_id, m.conversation_id, m.created_at
            FROM messages m
            WHERE conversation_id = $1
            ORDER BY created_at ASC
            `, [conversationId]);
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.fetchAllMessagesByConversationId = fetchAllMessagesByConversationId;
const saveMessage = (conversationId, sendId, content) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.query(`
            INSERT INTO messages (conversation_id, sender_id, content)
            VALUES ($1, $2, $3)
            RETURNING *
            `, [conversationId, sendId, content]);
        return result.rows[0];
    }
    catch (error) {
        console.error('Error saving message:', error);
        throw new Error('Error saving message');
    }
});
exports.saveMessage = saveMessage;
