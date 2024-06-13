const express = require("express");
const ditto = require("./pokemon/ditto.json");

const app = express();
app.disable("x-powered-by");

const PORT = process.env.PORT ?? 1234;

app.use(express.json());

// app.use((request, response, next) => {
//   console.log("Middleware 1");
//   //Traking de datos
//   //Validaciones
//   if (request.method !== "POST") return next();
//   if (request.headers["content-type"] !== "application/json") return next();

//   let body = "";

//   request.on("data", (chunk) => {
//     body += chunk.toString();
//   });

//   request.on("end", () => {
//     const data = JSON.parse(body);
//     data.timestamp = Date.now();
//     //Mutar la request y meter la información en el request.body
//     request.body = data;
//     next();
//   });
// });

app.get("/pokemon/ditto", (request, response) => {
  //Request para guardar en la base de datos
  response.json(ditto);
});

app.post("/pokemon", (request, response) => {
  response.status(201).json(request.body);
});

app.use((request, response) => {
  response.status(404).send("<h1>404 Not Found</h1>");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
