const http = require('http');

const server = http.createServer((req, res) => {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    console.log('Hello World');  // Prints in terminal

    res.end('Hello World');      // Prints in browser

});

server.listen(3001, () => {
    console.log('Server running on port 3001');
});