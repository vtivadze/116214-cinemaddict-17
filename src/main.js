import {render} from './render.js';
import UserTitleView from './view/user-title-view.js';

const siteHeaderElement = document.querySelector('.header');

render(new UserTitleView(), siteHeaderElement);

