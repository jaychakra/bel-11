const http = require('http');
const { createProxyServer } = require('http-proxy');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

// Backend server configuration
const BACKEND_SERVERS = [3000, 3001, 3002, 3003, 3004];
let currentServerIndex = 0;

const SECRET_KEY = 'your_secret_key';  // Use the same secret as in backend

// Create HTTP server for load balancer
const server = http.createServer((req, res) => {
    // Select a backend server using round-robin for HTTP requests
    const serverPort = BACKEND_SERVERS[currentServerIndex];
    currentServerIndex = (currentServerIndex + 1) % BACKEND_SERVERS.length;

    console.log(`HTTP request received. Delegating to server on port ${serverPort}.`);

    // Create a proxy for the HTTP request
    const proxy = createProxyServer({});
    proxy.web(req, res, { target: `http://localhost:${serverPort}` });

    // Handle proxy errors
    proxy.on('error', (err, req, res) => {
        console.error(`Error proxying request to server on port ${serverPort}:`, err);
        res.statusCode = 500;
        res.end('Error proxying request');
    });
});

// Socket.IO for Load Balancer
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

// Handle socket connections
io.on('connection', (socket) => {
    // Select a backend server using round-robin for WebSocket connections
    const serverPort = BACKEND_SERVERS[currentServerIndex];
    currentServerIndex = (currentServerIndex + 1) % BACKEND_SERVERS.length;

    console.log(`Socket.IO client connected. Delegating to server on port ${serverPort}.`);

    // Retrieve token from the client socket if it exists
    const token = socket.handshake.auth.token;  // Client token

    // If the token is not provided by the client, generate a mock one
    const tokenToSend = token || jwt.sign({ username: 'mockuser' }, SECRET_KEY, { expiresIn: '1h' });

    // Create socket connection to the backend server with authentication token
    const proxySocket = require('socket.io-client')(`http://localhost:${serverPort}`, {
        auth: { token: tokenToSend }  // Pass token in the handshake
    });

    // Ensure that the proxySocket is connected before proceeding
    proxySocket.on('connect', () => {
        console.log(`Proxy connected to backend server on port ${serverPort}`);

        // Forward events from client to backend
        socket.onAny((event, ...args) => {
            console.log(`Forwarding event ${event} from client to backend`);
            proxySocket.emit(event, ...args);
        });

        // Forward events from backend to client
        proxySocket.onAny((event, ...args) => {
            console.log(`Forwarding event ${event} from backend to client`);
            socket.emit(event, ...args);
        });
    });

    // Handle connection errors
    proxySocket.on('connect_error', (err) => {
        console.error(`Failed to connect to backend server on port ${serverPort}:`, err);
        socket.emit('error', 'Failed to connect to backend server');
    });

    // Handle client disconnection
    socket.on('disconnect', () => {
        console.log(`Client disconnected from load balancer`);
        proxySocket.disconnect();
    });

    // Handle proxySocket disconnection (if the backend server disconnects)
    proxySocket.on('disconnect', () => {
        console.log(`Proxy disconnected from server on port ${serverPort}`);
    });
});

// Start the load balancer
const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Load balancer running on http://localhost:${PORT}`);
});