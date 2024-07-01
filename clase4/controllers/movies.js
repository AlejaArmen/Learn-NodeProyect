import { MovieModel } from "../models/local-file-system/movie.js";

export class MovieController {
  static async getAll(request, response) {
    const { genre } = request.query;
    const movies = await MovieModel.getAll({ genre });
    response.json(movies);
  }
  static async getById(request, response) {
    //path-to-regexp
    const { id } = request.params;
    const movie = await MovieModel.getById({ id });
    if (movie) return response.json(movie);
    response.status(404).json({ error: "Movie not found" });
  }

  static async create(request, response) {
    const result = validateMovie(request.body);
    if (!result.success) {
      return response
        .status(400)
        .json({ error: JSON.parse(result.error.message) });
    }
    const newMovie = await MovieModel.create({ input: result.data });
    //Esto no es rest
    response.status(201).json(newMovie); //actualizar la cache del cliente.
  }

  static async delete(request, response) {
    const { id } = request.params;
    const result = await MovieModel.delete({ id });
    if (result === false) {
      return response.status(404).json({ message: "Movie not found" });
    }
    return response.json({ message: "Movie deleted" });
  }

  static async update(request, response) {
    const result = validatePartialMovie(request.body);
    console.log(result.success);
    if (!result.success) {
      return response
        .status(400)
        .json({ error: JSON.parse(result.error.message) });
    }
    console.log("Que esta pasando: ", result);

    const { id } = request.params;
    const updateMovie = await MovieModel.update({ id, input: result.data });
    return response.json(updateMovie);
  }
}
