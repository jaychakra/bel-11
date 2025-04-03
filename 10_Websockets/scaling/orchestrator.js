const { spawn } = require('child_process');
const axios = require('axios');

const START_PORT = 3000;
const SERVER_COUNT = 5;
const HEALTH_CHECK_INTERVAL = 10000; // 10 seconds
const MAX_FAILED_CHECKS = 3;

let servers = [];
let failedChecks = new Map();

function startServer(port) {
    const server = spawn('node', [`${__dirname}/redis-server.js`, port]);

    server.stdout.on('data', (data) => {
        console.log(`[Server ${port}] ${data}`);
    });

    server.stderr.on('data', (data) => {
        console.error(`[Server ${port}] Error: ${data}`);
    });

    server.on('close', (code) => {
        console.log(`[Server ${port}] exited with code ${code}`);
    });

    servers[port] = server;
    failedChecks.set(port, 0);
}

function stopServer(port) {
    if (servers[port]) {
        servers[port].kill();
        delete servers[port];
        failedChecks.delete(port);
        console.log(`[Orchestrator] Server on port ${port} stopped.`);
    }
}

async function healthCheck() {
    for (let port = START_PORT; port < START_PORT + SERVER_COUNT; port++) {
        try {
            await axios.get(`http://localhost:${port}/ping`);
            failedChecks.set(port, 0);
            console.log(`[Orchestrator] Server on port ${port} is healthy.`);
        } catch (error) {
            console.warn(`[Orchestrator] Health check failed for server on port ${port}.`);
            let failureCount = (failedChecks.get(port) || 0) + 1;
            failedChecks.set(port, failureCount);

            if (failureCount >= MAX_FAILED_CHECKS) {
                console.error(`[Orchestrator] Server on port ${port} is unhealthy. Restarting...`);
                stopServer(port);
                startServer(port);
            }
        }
    }
}

// Start initial servers
for (let i = 0; i < SERVER_COUNT; i++) {
    const port = START_PORT + i;
    startServer(port);
}

// Schedule periodic health checks
setInterval(healthCheck, HEALTH_CHECK_INTERVAL);