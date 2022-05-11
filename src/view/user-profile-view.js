import AbstractView from '../framework/view/abstract-view.js';

const createUserTitleTemplate = (userTitle, userImage) => (
  `<section class="header__profile profile">
    <p class="profile__rating">${userTitle}</p>
    <img class="profile__avatar" src="images/${userImage}" alt="Avatar" width="35" height="35">
  </section>`
);

export default class UserProfileView extends AbstractView {
  #userTitle = null;

  #userImages = {
    'novice': 'bitmap.png',
    'fan': 'bitmap@2x.png',
    'movie buff': 'bitmap@3x.png'
  };

  constructor(userTitle) {
    super();
    this.#userTitle = userTitle;
  }

  get template () {
    return createUserTitleTemplate(this.#userTitle, this.#getUserImage());
  }

  #getUserImage() {
    return this.#userImages[this.#userTitle];
  }
}
