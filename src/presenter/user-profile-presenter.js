import {render, replace, remove} from '../framework/render.js';
import UserProfileView from '../view/user-profile-view.js';

export default class UserProfilePresenter {
  #userProfileContainer = null;
  #moviesModel = null;

  #userProfileComponent = null;

  #userTitle = {
    titles: [
      {min: 0, max: 0, title: ''},
      {min: 1, max: 10, title: 'novice'},
      {min: 11, max: 20, title: 'fan'},
      {min: 21, max: Number.POSITIVE_INFINITY, title: 'movie buff'},
    ],
    getTitle: function(count) {
      return this.titles
        .find((item) => count >= item.min && count <= item.max)
        .title;
    }
  };

  constructor(userProfileContainer) {
    this.#userProfileContainer = userProfileContainer;
  }

  init(moviesModel) {
    this.#moviesModel = moviesModel;

    if (this.#getUserTitle()) {
      this.#renderUserProfile();
    }
  }

  #renderUserProfile() {
    const prevUserProfileComponent = this.#userProfileComponent;
    this.#userProfileComponent = new UserProfileView(this.#getUserTitle());

    if (prevUserProfileComponent === null) {
      render(this.#userProfileComponent, this.#userProfileContainer);
      return;
    }

    if (this.#userProfileContainer.contains(prevUserProfileComponent.element)) {
      this.#replaceUserProfileComponent(prevUserProfileComponent);
    }

    remove(prevUserProfileComponent);
  }

  #replaceUserProfileComponent(prevUserProfileComponent) {
    replace(this.#userProfileComponent, prevUserProfileComponent);
  }

  #getAlreadyWatchedCount() {
    return this.#moviesModel.alreadyWatchedCount;
  }

  #getUserTitle() {
    const count = this.#getAlreadyWatchedCount();
    return this.#userTitle.getTitle(count);
  }
}
