const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const folder = path.join(__dirname, "files");

if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
}

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const filename = url.searchParams.get("name");

    if (!filename) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        return res.end("File name is required");
    }

    const filePath = path.join(folder, filename);

    if (req.method === "POST") {
        let data = "";

        req.on("data", chunk => {
            data += chunk;
        });

        req.on("end", () => {
            fs.writeFile(filePath, data, err => {
                if (err) {
                    res.writeHead(500);
                    return res.end("Error creating file");
                }

                res.end("File created successfully");
            });
        });
    }

    else if (req.method === "GET") {
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                res.writeHead(404);
                return res.end("File not found");
            }

            res.end(data);
        });
    }

    else if (req.method === "PUT") {
        let data = "";

        req.on("data", chunk => {
            data += chunk;
        });

        req.on("end", () => {
            fs.writeFile(filePath, data, err => {
                if (err) {
                    res.writeHead(404);
                    return res.end("File not found");
                }

                res.end("File updated successfully");
            });
        });
    }

    else if (req.method === "DELETE") {
        fs.unlink(filePath, err => {
            if (err) {
                res.writeHead(404);
                return res.end("File not found");
            }

            res.end("File deleted successfully");
        });
    }

    else {
        res.writeHead(405);
        res.end("Method not allowed");
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});