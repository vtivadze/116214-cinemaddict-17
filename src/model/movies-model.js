import Observable from '../framework/observable.js';
import { generateMovie } from '../mock/movie.js';

const MOVIES_COUNT = 25;

export default class MoviesModel extends Observable {
  #movies = Array.from({length: MOVIES_COUNT}, generateMovie);

  get movies() {
    return this.#movies;
  }

  updateMovie = (updateType, update) => {
    const index = this.#movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexiting movie');
    }

    this.#movies = [
      ...this.#movies.slice(0, index),
      update,
      ...this.#movies.slice(index + 1)
    ];

    this._notify(updateType, update);
  };

  get watchListCount() {
    return this.#movies.filter((movie) => movie.userDetails.watchlist).length;
  }

  get alreadyWatchedCount() {
    return this.#movies.filter((movie) => movie.userDetails.alreadyWatched).length;
  }

  get favoriteCount() {
    return this.#movies.filter((movie) => movie.userDetails.favorite).length;
  }

  get mostCommented() {
    return [...this.#movies].sort((a, b) => b.comments.length - a.comments.length);
  }

  get topRated() {
    return [...this.#movies].sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
  }
}
