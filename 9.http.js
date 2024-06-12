const http = require("node:http");

const server = http.createServer((req, res) => {
  console.log("request received");
  res.end("Hello World");
});

server.listen(0, () => {
  console.log(`Server listening on port ${server.address().port}`);
});
