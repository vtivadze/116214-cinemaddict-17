import {render} from '../framework/render.js';
import UserProfileView from '../view/user-profile-view.js';

export default class UserProfilePresenter {
  #container = null;
  #moviesModel = null;

  #userTitle = {
    titles: [
      {min: 0, max: 0, title: ''},
      {min: 1, max: 10, title: 'novice'},
      {min: 11, max: 20, title: 'fan'},
      {min: 21, max: Number.POSITIVE_INFINITY, title: 'movie buf'},
    ],
    getTitle: function(count) {
      return this.titles
        .find((item) => count >= item.min && count <= item.max)
        .title;
    }
  };

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
    return this.#userTitle.getTitle(count);
  }
}
