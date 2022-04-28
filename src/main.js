import {render} from './render.js';
import UserProfileView from './view/user-profile-view.js';

const siteHeaderElement = document.querySelector('.header');

render(new UserProfileView(), siteHeaderElement);

