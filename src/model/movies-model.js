import Observable from '../framework/observable.js';
import { generateMovie } from '../mock/movie.js';
import { MOVIES_COUNT } from '../const.js';

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
}
