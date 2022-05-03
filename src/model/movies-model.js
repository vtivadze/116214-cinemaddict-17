import { generateMovie } from '../mock/movie.js';

const MOVIES_COUNT = 9;

export default class MoviesModel {
  #movies = Array.from({length: MOVIES_COUNT}, generateMovie);

  get movies() {
    return this.#movies;
  }

  getWatchListCount = () => this.#movies.filter((movie) => movie.userDetails.watchlist).length;
  getAlreadyWatchedCount = () => this.#movies.filter((movie) => movie.userDetails.alreadyWatched).length;
  getFavoreiteCount = () => this.#movies.filter((movie) => movie.userDetails.favorite).length;
}
