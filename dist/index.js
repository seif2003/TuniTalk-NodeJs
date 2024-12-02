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
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const conversationsRoutes_1 = __importDefault(require("./routes/conversationsRoutes"));
const messagesRoutes_1 = __importDefault(require("./routes/messagesRoutes"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const messagesController_1 = require("./controllers/messagesController");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use((0, body_parser_1.json)());
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
    },
});
app.use('/auth', authRoutes_1.default);
app.use('/conversations', conversationsRoutes_1.default);
app.use('/messages', messagesRoutes_1.default);
io.on('connection', (socket) => {
    console.log('A user connected', socket.id);
    socket.on('joinConversation', (conversationId) => {
        socket.join(conversationId);
        console.log(`A user joined conversation ${conversationId}`);
    });
    socket.on('sendMessage', (message) => __awaiter(void 0, void 0, void 0, function* () {
        const { conversationId, senderId, content } = message;
        try {
            const savedMessage = yield (0, messagesController_1.saveMessage)(conversationId, senderId, content);
            console.log('Message saved:');
            console.log(savedMessage);
            io.to(conversationId).emit('newMessage', savedMessage);
        }
        catch (error) {
            console.error('Error saving message:', error);
        }
    }));
    socket.on('disconnect', () => {
        console.log('A user disconnected', socket.id);
    });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
