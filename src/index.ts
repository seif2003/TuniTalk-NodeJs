import express from 'express';
import {json} from 'body-parser';
import authRoutes from './routes/authRoutes';
import conversationsRoutes from './routes/conversationsRoutes';
import messagesRoutes from './routes/messagesRoutes';
import http from 'http';
import { Server } from 'socket.io';
import { saveMessage } from './controllers/messagesController';

const app = express();
const server = http.createServer(app);
app.use(json());
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

app.use('/auth', authRoutes);
app.use('/conversations', conversationsRoutes);
app.use('/messages', messagesRoutes);

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    socket.on('joinConversation', (conversationId) => {
        socket.join(conversationId);
        console.log(`A user joined conversation ${conversationId}`);
    });

    socket.on('sendMessage', async (message) => {
        const {conversationId, senderId, content} = message;

        try {
            const savedMessage = await saveMessage(conversationId, senderId, content);
            console.log('Message saved:');
            console.log(savedMessage);
            io.to(conversationId).emit('newMessage', savedMessage);
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});