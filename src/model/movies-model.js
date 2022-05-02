import { generateMovie } from '../mock/movie.js';

const MOVIES_COUNT = 9;

export default class MoviesModel {
  movies = Array.from({length: MOVIES_COUNT}, generateMovie);

  getMovies = () => this.movies;
  getWatchListCount = () => this.movies.reduce((count, movie) => movie.userDetails.watchlist ? ++count : count, 0);
  getAlreadyWatchedCount = () => this.movies.reduce((count, movie) => movie.userDetails.alreadyWatched ? ++count : count, 0);
  getFavoreiteCount = () => this.movies.reduce((count, movie) => movie.userDetails.favorite ? ++count : count, 0);
}
