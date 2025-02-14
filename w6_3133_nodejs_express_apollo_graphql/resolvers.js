const Movie = require("./models/Movie");

const resolvers = {
  Query: {
    getMovies: async () => await Movie.find(),
    getMovieById: async (_, { id }) => await Movie.findById(id),
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
      return await Movie.findByIdAndUpdate(
        id,
        { name, director_name, production_house, release_date, rating },
        { new: true }
      );
    },
    deleteMovie: async (_, { id }) => {
      return await Movie.findByIdAndRemove(id);
    },
  },
};

module.exports = resolvers;
