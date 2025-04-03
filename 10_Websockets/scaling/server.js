// server.js
const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key';

let chatrooms = {
    room1: [],
    room2: [],
    room3: [],
    room4: [],
};

function createServer({ hostname = 'localhost', port }) {
    const app = express();
    // Serve the HTML page
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
      });
    
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: { origin: '*' },
    });

    app.use(express.json());

    // Health check endpoint
    app.get('/ping', (req, res) => {
        res.status(200).send('pong');
    });

    // Mock login endpoint
    app.post('/login', (req, res) => {
        const { username, password } = req.body;
        if (username === password) {
            const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
            return res.json({ token });
        } else {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    });

    // Socket.IO authentication middleware
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error('Authentication error'));
        }
        try {
            const payload = jwt.verify(token, SECRET_KEY);
            socket.user = payload;
            next();
        } catch (err) {
            next(new Error('Authentication error'));
        }
    });

    // Socket.IO connection handling
    io.on('connection', (socket) => {
        console.log(`${socket.user.username} connected`);
    
        socket.on('join-room', (room) => {
            const currentRooms = Array.from(socket.rooms).filter((r) => r !== socket.id);
            if (currentRooms.length > 0) {
                const currentRoom = currentRooms[0];
                socket.leave(currentRoom);
                const leaveMessage = {
                    username: 'System',
                    message: `${socket.user.username} has left the room`,
                    gray: true,
                };
                chatrooms[currentRoom].push(leaveMessage);
                io.to(currentRoom).emit('message', leaveMessage);
            }
    
            socket.join(room);
            const lastMessages = chatrooms[room].slice(-50);
            socket.emit('room-messages', lastMessages);
    
            const joinMessage = {
                username: 'System',
                message: `${socket.user.username} has joined the room`,
                gray: true,
            };
            chatrooms[room].push(joinMessage);
            io.to(room).emit('message', joinMessage);
        });
    
        socket.on('message', (message) => {
            const rooms = Array.from(socket.rooms).filter((r) => r !== socket.id);
            if (rooms.length > 0) {
                const room = rooms[0];
                const chatMessage = { username: socket.user.username, message };
                chatrooms[room].push(chatMessage);
                io.to(room).emit('message', chatMessage);
            }
        });
    
        socket.on('disconnect', () => {
            const rooms = Array.from(socket.rooms).filter((r) => r !== socket.id);
            rooms.forEach((room) => {
                const leaveMessage = {
                    username: 'System',
                    message: `${socket.user.username} has left the room`,
                    gray: true,
                };
                chatrooms[room].push(leaveMessage);
                io.to(room).emit('message', leaveMessage);
            });
            console.log(`${socket.user.username} disconnected`);
        });
    });

    server.listen(port, hostname, () => {
        console.log(`Server running on http://${hostname}:${port}`);
    });

    return { app, server, io };
}

const port = process.argv[2];
console.log(process.argv);

if (!port) {
    console.error('Port number is required. Usage: node server.js <port>');
    process.exit(1);
}

createServer({ port });