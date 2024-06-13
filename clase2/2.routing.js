const http = require("node:http");

const dittoJson = require("./pokemon/ditto.json");

const processRequest = (request, response) => {
  const { method, url } = request;

  switch (method) {
    case "GET":
      switch (url) {
        case "/pokemon/ditto":
          response.setHeader("Content-Type", "application/json; charset=utf-8");
          return response.end(JSON.stringify(dittoJson));
        default:
          response.statusCode = 404;
          response.setHeader("Content-Type", "text/html; charset=utf-8");
          return response.end("<h1>404 Not Found</h1>");
      }
    case "POST":
      switch (url) {
        case "/pokemon": {
          const body = "";
        }

        case "/otro": {
          let body = "";
          request.on("data", (chunk) => {
            body += chunk.toString();
          });

          request.on("end", () => {
            const data = JSON.parse(body);
            //llamar a una base de datos para guardar info
            response.writeHead(201, {
              "Content-Type": "application/json; charset=utf-8",
            });
            response.end(JSON.stringify(data));
          });
          break;
        }
        default:
          response.statusCode = 404;
          response.setHeader("Content-Type", "text/html; charset=utf-8");
          return response.end("<h1>404 Not Found</h1>");
      }
  }
};

const server = http.createServer(processRequest);

server.listen(1234, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:1234`);
});
