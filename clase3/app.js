const express = require("express");
const movies = require("./movies");

const app = express();
app.disable("x-powered-by");

app.get("/movies", (request, response) => {
  const { genre } = request.query;
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.includes(genre)
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

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
