const { default: axios } = require("axios");
const _ = require("lodash");
const getMovieAndYear = require("../utils/getMovieAndYear");
const validateURL = require("../utils/validateURL");
const createError = require("http-errors");
require("dotenv").config();

const API_KEY = process.env.TMBD_API_KEY;

const getTrailer = async (req, res, next) => {
  try {
    const { url } = req.body;
    if (!url) throw createError(400, "invalid url");
    if (!validateURL(url)) throw createError(400, "invalid url");

    // Get movie id from the themoviedb
    const { movieName, movieYear } = getMovieAndYear(url);
    const getMovieIDUrl = "https://api.themoviedb.org/3/search/movie?";
    if (!API_KEY) throw createError(401, "moviedb API Key is invalid");
    const paramsToGetMovieID = new URLSearchParams({
      api_key: API_KEY,
      query: movieName,
      year: movieYear,
    }).toString();
    const movieSearchResponse = await axios.get(
      getMovieIDUrl + paramsToGetMovieID
    );
    const id = _.get(movieSearchResponse, ["data", "results", "0", "id"]);
    if (!id)
      throw createError(
        404,
        `${movieName}-${movieYear} not found on the moviedb`
      );
    // Get movie trailer id from the themoviedb
    const getMovieWithIDUrl = `https://api.themoviedb.org/3/movie/${id}?`;
    const paramsToGetTrailerID = new URLSearchParams({
      api_key: API_KEY,
      append_to_response: "videos",
    }).toString();
    const movieWithTrailerResponse = await axios.get(
      getMovieWithIDUrl + paramsToGetTrailerID
    );
    const trailerKey = _.get(movieWithTrailerResponse, [
      "data",
      "videos",
      "results",
      0,
      "key",
    ]);
    if (!trailerKey)
      throw createError(404, `Trailer not found for ${movieName}`);
    return res.send("https://www.youtube.com/watch?v=" + trailerKey);
  } catch (err) {
    next(err);
  }
};

const getTrailerFromViaPlay = async (req, res, next) => {
  try {
    const url = req.body.url;
    const response = await axios.get(url);
    console.log(
      JSON.stringify(
        response.data._embedded["viaplay:blocks"][0]._embedded[
          "viaplay:product"
        ].content.imdb,
        null,
        2
      )
    );
    return res.send(
      response.data._embedded["viaplay:blocks"][0]._embedded["viaplay:product"]
        .content.imdb.url
    );
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTrailer,
  getTrailerFromViaPlay,
};
