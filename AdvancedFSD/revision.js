const http = require("http");

const server = http.createServer((req, res) => {

    if (req.url === "/") {
        res.end("Home Page");
    }
    else if (req.url === "/about") {
        res.end("About Page");
    }
    else if (req.url === "/students") {
        res.end("Students Page");
    }

});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});