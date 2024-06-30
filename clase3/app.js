const express = require("express");
const movies = require("./movies");
const cors = require("cors");
const crypto = require("node:crypto");
const { validateMovie } = require("./schemas/movies");
const { validatePartialMovie } = require("./schemas/movies");
const { error } = require("node:console");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        "http://localhost:8080",
        "http://localhost:1234",
        "https://myapp.com",
        "https://movies.com",
      ];

      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);
app.disable("x-powered-by");

app.get("/movies", (request, response) => {
  //Solucion para CORS
  // const origin = request.header("origin");
  // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
  //   response.header("Access-Control-Allow-Origin", origin);
  // }
  response.header("Access-Control-Allow-Origin", "*");
  const { genre } = request.query;
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
    return response.json(filteredMovies);
  }
  response.json(movies);
});

app.get("/movies/:id", (request, response) => {
  //path-to-regexp
  const { id } = request.params;
  const movie = movies.find((movie) => movie.id === id);
  if (movie) return response.json(movie);
  response.status(404).json({ error: "Movie not found" });
});

app.post("/movies", (request, response) => {
  const result = validateMovie(request.body);

  if (!result.success) {
    return response
      .status(400)
      .json({ error: JSON.parse(result.error.message) });
  }
  //Esto no es rest
  const newMovie = {
    id: crypto.randomUUID(), //uuid v4
    ...result.data,
  };
  //esto no es es rest
  movies.push(newMovie);

  response.status(201).json(newMovie); //actualizar la cache del cliente.
});

app.patch("/movies/:id", (request, response) => {
  const result = validatePartialMovie(request.body);
  console.log(result.success);
  if (!result.success) {
    return response
      .status(400)
      .json({ error: JSON.parse(result.error.message) });
  }
  console.log("Que esta pasando: ", result);

  const { id } = request.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return response.status(404).json({ message: "Movie not found" });
  }
  const updateMovie = {
    ...movies[movieIndex],
    ...result.data,
  };
  movies[movieIndex] = updateMovie;
  console.log("Que esta pasando: ", updateMovie);
  console.log("Toda la pelicula con el id: ", movies[movieIndex]);
  return response.json(updateMovie);
});

app.delete("/movies/:id", (request, response) => {
  const { id } = request.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return response.status(404).json({ message: "Movie not found" });
  }

  movies.splice(movieIndex, 1); //.splice es un metodo de los arrays que elimina elementos de un array por ejemplo movies.splice(1, 1) elimina el elemento en la posicion 1
  return response.json({ message: "Movie deleted" });
});
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
const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
