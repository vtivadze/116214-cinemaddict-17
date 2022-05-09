import {createElement} from '../render.js';

const createUserTitleTemplate = (userTitle, userImage) => (
  `<section class="header__profile profile">
    <p class="profile__rating">${userTitle}</p>
    <img class="profile__avatar" src="images/${userImage}" alt="Avatar" width="35" height="35">
  </section>`
);

export default class UserProfileView {
  #userTitle = null;
  #element = null;

  #userImages = {
    'novice': 'bitmap.png',
    'fan': 'bitmap@2x.png',
    'movie buff': 'bitmap@3x.png'
  };

  constructor(userTitle) {
    this.#userTitle = userTitle;
  }

  get template () {
    return createUserTitleTemplate(this.#userTitle, this.#getUserImage());
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }

  #getUserImage() {
    return this.#userImages[this.#userTitle];
  }
}
