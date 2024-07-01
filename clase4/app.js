import express, { json } from "express";
import { moviesRouter } from "./routes/movies.js";
import { corsMiddleware } from "./middlewares/cors.js";

const app = express();
app.use(json());
app.use(corsMiddleware());
app.disable("x-powered-by");
//Codigo manual de options en cors
// app.options("/movies/:id", (request, response) => {
//   const origin = request.header("origin");

//   if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
//     response.header("Access-Control-Allow-Origin", origin);
//     response.header("Access-Control-Allow-Methods", "PATCH, DELETE");
//   }
//   response.send(200);
// });
//Cors son problemas de cabezeras

app.use("/movies", moviesRouter);
const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
