const http = require("node:http");
const fs = require("node:fs");
const desiredPort = process.env.PORT ?? 1234;

const processRequest = (request, response) => {
  response.setHeader("Content-Type", "text/html; charset=utf-8");

  if (request.url === "/") {
    response.statusCode = 200;
    response.end("<h1>Bienvenido a la página de inicio</h1>");
  } else if (request.url === "/logo-club.png") {
    fs.readFile("./logo-1.png", (error, data) => {
      console.log("error", error);
      if (error) {
        response.statusCode = 500;
        response.end("<h1>Error interno codigo 500</h1>");
      } else {
        response.statusCode = 200;
        response.setHeader("Content-Type", "image/png");
        response.end(data);
      }
    });
  } else if (request.url === "/contacto") {
    response.statusCode = 200;
    response.end("<h1>Contáctanos</h1>");
  } else {
    response.statusCode = 404;
    response.end("<h1>404 Not Found</h1>");
  }
};

const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
  console.log(
    `Servidor escuchando en el puerto http://localhost:${desiredPort}`
  );
});
