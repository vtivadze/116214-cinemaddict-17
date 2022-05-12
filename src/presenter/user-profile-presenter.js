import {render} from '../framework/render.js';
import UserProfileView from '../view/user-profile-view.js';

const NO_TITLE_COUNT = 0;
const NOVICE_MIN_COUNT = 1;
const NOVICE_MAX_COUNT = 10;
const FAN_MIN_COUNT = 11;
const FAN_MAX_COUNT = 20;
const MOVIE_BUF_MIN_COUNT = 21;

export default class UserProfilePresenter {
  #container = null;
  #moviesModel = null;

  constructor(container, moviesModel) {
    this.#container = container;
    this.#moviesModel = moviesModel;
  }

  render() {
    if (this.#getUserTitle()) {
      render(new UserProfileView(this.#getUserTitle()), this.#container);
    }
  }

  #getAlreadyWatchedCount() {
    return this.#moviesModel.alreadyWatchedCount;
  }

  #getUserTitle() {
    const count = this.#getAlreadyWatchedCount();
    let userTitle = null;

    if (count === NO_TITLE_COUNT) {
      userTitle = '';
    } else if (count >= NOVICE_MIN_COUNT && count <= NOVICE_MAX_COUNT) {
      userTitle = 'novice';
    } else if (count >= FAN_MIN_COUNT && count <= FAN_MAX_COUNT) {
      userTitle = 'fan';
    } else if (count >= MOVIE_BUF_MIN_COUNT) {
      userTitle = 'movie buff';
    }

    return userTitle;
  }
}
