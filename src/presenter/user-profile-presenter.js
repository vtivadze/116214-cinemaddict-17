import {render, remove} from '../framework/render.js';
import UserProfileView from '../view/user-profile-view.js';

export default class UserProfilePresenter {
  #siteMainElement = null;
  #userProfilesModel = null;
  #moviesModel = null;

  #userProfile = null;
  #userProfileComponent = null;

  constructor(siteMainElement, userProfilesModel, moviesModel) {
    this.#siteMainElement = siteMainElement;
    this.#userProfilesModel = userProfilesModel;
    this.#moviesModel = moviesModel;

    this.#moviesModel.addObserver(this.#handleModelEvent.bind(this));
  }

  init() {
    this.#removePreviousUserProfileComponent();
    this.#userProfile = this.#getUserProfile();

    if (this.#userProfile) {
      this.#renderUserProfile();
    }
  }

  #renderUserProfile() {
    this.#userProfileComponent = new UserProfileView(this.#userProfile);
    render(this.#userProfileComponent, this.#siteMainElement);
  }

  #removePreviousUserProfileComponent() {
    if (this.#userProfileComponent && this.#siteMainElement.contains(this.#userProfileComponent.element)) {
      remove(this.#userProfileComponent);
    }
  }

  #getUserProfile() {
    const alreadyWatchedCount = this.#moviesModel.movies.filter((movie) => movie.userDetails.alreadyWatched).length;

    return this.#userProfilesModel.userProfiles
      .find((item) => alreadyWatchedCount >= item.range.min && alreadyWatchedCount <= item.range.max);
  }

  #handleModelEvent() {
    this.init();
  }
}
