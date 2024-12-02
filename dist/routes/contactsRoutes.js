"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const contactsController_1 = require("../controllers/contactsController");
const router = (0, express_1.Router)();
router.get('/', authMiddleware_1.verifyToken, contactsController_1.fetchContacts);
router.post('/', authMiddleware_1.verifyToken, contactsController_1.addContact);
exports.default = router;
