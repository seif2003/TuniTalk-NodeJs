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
const express_1 = require("express");
const db_1 = __importDefault(require("../models/db"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.get('/', authMiddleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = null;
    if (req.user) {
        userId = req.user.id;
    }
    try {
        const result = yield db_1.default.query(`
            SELECT c.id AS conversation_id,
            u.username AS participant_name,
            m.content AS last_message,
            m.created_at AS last_message_time
            FROM conversations c
            JOIN users u ON (u.id = c.participant_two AND u.id != $1)
            LEFT JOIN LATERAL (
                SELECT content, created_at
                FROM messages
                WHERE conversation_id = c.id
                ORDER BY created_at DESC
                LIMIT 1
            ) m ON true
            WHERE participant_one = $1 OR participant_two = $1
            ORDER BY last_message_time DESC
            `, [userId]);
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error fetching conversations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = router;
