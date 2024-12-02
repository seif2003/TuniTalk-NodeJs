"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const conversationController_1 = require("../controllers/conversationController");
const router = (0, express_1.Router)();
router.get('/', authMiddleware_1.verifyToken, conversationController_1.fetchAllConversationsByUserId);
router.post('/check-or-create', authMiddleware_1.verifyToken, conversationController_1.checkOrCreateConversation);
exports.default = router;
