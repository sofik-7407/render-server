const http = require('http'); // Node.js module for creating server

const startServer = (app) => {
    const server = http.createServer(app); // Creating server with the help of http and express
    
    const PORT = process.env.REST_PORT || 5000;
    server.listen(PORT);
    server.on('listening', () => {
        console.log(`Server is listening on port: ${server.address().port}`);
    });
    server.on('error', (err) => {
        console.error('Error:', err.stack);
    });
};

module.exports = {
    startServer: startServer
};
