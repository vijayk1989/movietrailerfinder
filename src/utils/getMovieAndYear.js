const getMovieAndYear = (url) => {
  try {
    const movieAndYear = url.split("/").slice(-1)[0];
    const splitMovieAndYear = movieAndYear.split("-");
    const movieYear = splitMovieAndYear[splitMovieAndYear.length - 1]; // Extract movie year from path
    splitMovieAndYear.pop(); // Remove year and only leave movie
    const movieName = splitMovieAndYear.join(" ");
    return {
      movieName,
      movieYear,
    };
  } catch (err) {
    return err;
  }
};

module.exports = getMovieAndYear;
