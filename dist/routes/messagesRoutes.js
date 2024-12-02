"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const messagesController_1 = require("../controllers/messagesController");
const router = (0, express_1.Router)();
router.get('/:conversationId', authMiddleware_1.verifyToken, messagesController_1.fetchAllMessagesByConversationId);
exports.default = router;
