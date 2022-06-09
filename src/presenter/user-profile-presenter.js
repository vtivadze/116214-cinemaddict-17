import { userTitles } from '../const.js';
import {render, replace, remove} from '../framework/render.js';
import UserProfileView from '../view/user-profile-view.js';

export default class UserProfilePresenter {
  #userProfileContainer = null;
  #moviesModel = null;

  #userProfileComponent = null;

  #userTitles = userTitles;

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

  #getUserTitle() {
    const count = this.#moviesModel.movies.filter((movie) => movie.userDetails.alreadyWatched).length;

    return this.#userTitles
      .find((item) => count >= item.min && count <= item.max)
      .title;
  }
}
