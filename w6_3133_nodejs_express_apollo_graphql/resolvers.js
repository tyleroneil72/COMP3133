const { Types } = require("mongoose");
const Movie = require("./models/Movie");

const resolvers = {
  Query: {
    getMovies: async () => await Movie.find(),
    getMovieById: async (_, { id }) => {
      if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid Movie ID format");
      }
      return await Movie.findById(id);
    },
  },
  Mutation: {
    addMovie: async (
      _,
      { name, director_name, production_house, release_date, rating }
    ) => {
      const movie = new Movie({
        name,
        director_name,
        production_house,
        release_date,
        rating,
      });
      return await movie.save();
    },
    updateMovie: async (
      _,
      { id, name, director_name, production_house, release_date, rating }
    ) => {
      if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid Movie ID format");
      }
      return await Movie.findByIdAndUpdate(
        id,
        { name, director_name, production_house, release_date, rating },
        { new: true }
      );
    },
    deleteMovie: async (_, { id }) => {
      if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid Movie ID format");
      }
      return await Movie.findByIdAndRemove(id);
    },
  },
};

module.exports = resolvers;
