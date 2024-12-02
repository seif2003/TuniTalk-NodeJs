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
exports.addContact = exports.fetchContacts = void 0;
const db_1 = __importDefault(require("../models/db"));
const fetchContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = null;
    if (req.user) {
        userId = req.user.id;
    }
    try {
        const result = yield db_1.default.query(`
            SELECT u.id AS contact_id, u.username, u.email
            From contacts c
            JOIN users u ON u.id = c.contact_id
            WHERE c.user_id = $1
            ORDER BY u.username ASC
            `, [userId]);
        return res.json(result.rows);
    }
    catch (error) {
        console.error('Error fetching contacts:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.fetchContacts = fetchContacts;
const addContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = null;
    if (req.user) {
        userId = req.user.id;
    }
    const { contactEmail } = req.body;
    try {
        const contactExists = yield db_1.default.query(`
            SELECT id from users where email = $1
            `, [contactEmail]);
        if (contactExists.rowCount === 0) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        const contactId = contactExists.rows[0].id;
        yield db_1.default.query(`
            INSERT INTO contacts (user_id, contact_id)
            VALUES($1,$2)
            ON CONFLICT DO NOTHING;
            `, [userId, contactId]);
        return res.status(201).json({ message: 'Contact added successfully' });
    }
    catch (error) {
        console.error('Error adding contact:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.addContact = addContact;
