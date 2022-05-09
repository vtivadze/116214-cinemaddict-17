import { generateMovie } from '../mock/movie.js';

const MOVIES_COUNT = 150;

export default class MoviesModel {
  #movies = Array.from({length: MOVIES_COUNT}, generateMovie);

  get movies() {
    return this.#movies;
  }

  get watchListCount() {
    return this.#movies.filter((movie) => movie.userDetails.watchlist).length;
  }

  get alreadyWatchedCount() {
    return this.#movies.filter((movie) => movie.userDetails.alreadyWatched).length;
  }

  get favoriteCount() {
    return this.#movies.filter((movie) => movie.userDetails.favorite).length;
  }
}
