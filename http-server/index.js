const http = require("http");
const fs = require("fs");
const minimist = require("minimist");

const args = minimist(process.argv.slice(2));
const port = args.port || 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream("home.html").pipe(res);
  } else if (req.url === "/project") {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream("project.html").pipe(res);
  } else if (req.url === "/registration") {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream("registration.html").pipe(res);
  } else if (req.url === "/style") {
    // Serve the CSS file
    res.writeHead(200, { "Content-Type": "text/css" });
    fs.createReadStream("./src/output.css").pipe(res);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>Page Not Found</h1>");
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
