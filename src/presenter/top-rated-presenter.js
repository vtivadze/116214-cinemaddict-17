import { render } from '../render.js';

export default class TopRatedPresenter {
  #topRatedCount = 2;
  #containerComponent = null;
  #moviesModel = null;
  #movies = null;

  constructor (containerComponent, moviesModel) {
    this.#containerComponent = containerComponent;
    this.#moviesModel = moviesModel;
    this.#movies = this.#moviesModel.movies;
  }

  init() {
    render(this.#containerComponent, )
  }

  get topRatedMovies() {
    return this.#movies.filter((element, index) => index < this.#topRatedCount);
  }


}
