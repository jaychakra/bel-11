const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const redis = require('redis');
const socketIoRedis = require('socket.io-redis');

const SECRET_KEY = 'your_secret_key';
const REDIS_HOST = 'localhost';
const REDIS_PORT = 6379;

// Connect to Redis
const redisClient = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT
});

redisClient.connect();

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

async function createServer({ hostname = 'localhost', port }) {
    const app = express();

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });

    const server = http.createServer(app);
    const io = new Server(server, {
        cors: { origin: '*' }
    });

    io.adapter(socketIoRedis({ host: REDIS_HOST, port: REDIS_PORT }));

    app.use(express.json());

    app.get('/ping', (req, res) => {
        res.status(200).send('pong');
    });

    app.post('/login', (req, res) => {
        const { username, password } = req.body;
        if (username === password) {
            const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
            return res.json({ token });
        } else {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    });

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

    io.on('connection', (socket) => {
        console.log(`${socket.user.username} connected`);

        socket.on('join-room', async (room) => {
            const currentRooms = Array.from(socket.rooms).filter((r) => r !== socket.id);
            if (currentRooms.length > 0) {
                const currentRoom = currentRooms[0];
                socket.leave(currentRoom);
                const leaveMessage = {
                    username: 'System',
                    message: `${socket.user.username} has left the room`,
                    gray: true,
                    source: `port-${port}`,
                };
                await redisClient.rPush(`chatroom:${currentRoom}`, JSON.stringify(leaveMessage));
                io.in(currentRoom).emit('message', leaveMessage);
            }

            socket.join(room);
            try {
                const messages = await redisClient.lRange(`chatroom:${room}`, 0, -1);
                const lastMessages = messages.map(msg => JSON.parse(msg)).slice(-50);
                socket.emit('room-messages', lastMessages);
            } catch (err) {
                console.error('Error fetching messages from Redis:', err);
            }

            const joinMessage = {
                username: 'System',
                message: `${socket.user.username} has joined the room`,
                gray: true,
                source: `port-${port}`,
            };
            await redisClient.rPush(`chatroom:${room}`, JSON.stringify(joinMessage));
            io.in(room).emit('message', joinMessage);
        });

        socket.on('message', async (message) => {
            const rooms = Array.from(socket.rooms).filter((r) => r !== socket.id);
            if (rooms.length > 0) {
                const room = rooms[0];
                const chatMessage = { username: socket.user.username, message, source: `port-${port}` };
                await redisClient.rPush(`chatroom:${room}`, JSON.stringify(chatMessage));

                // Emit message to all clients in the room, including the sender
                io.in(room).emit('message', chatMessage);
            }
        });

        socket.on('disconnect', async () => {
            const rooms = Array.from(socket.rooms).filter((r) => r !== socket.id);
            for (let room of rooms) {
                const leaveMessage = {
                    username: 'System',
                    message: `${socket.user.username} has left the room`,
                    gray: true,
                    source: `port-${port}`,
                };
                await redisClient.rPush(`chatroom:${room}`, JSON.stringify(leaveMessage));
                io.in(room).emit('message', leaveMessage);
            }
            console.log(`${socket.user.username} disconnected`);
        });
    });

    server.listen(port, hostname, () => {
        console.log(`Server running on http://${hostname}:${port}`);
    });

    return { app, server, io };
}

const port = process.argv[2];

if (!port) {
    console.error('Port number is required. Usage: node server.js <port>');
    process.exit(1);
}

createServer({ port });
