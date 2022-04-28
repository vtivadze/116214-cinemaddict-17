import {render} from './render.js';
import UserTitleView from './view/user-title-view.js';
import FilterView from './view/filter-view.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

render(new UserTitleView(), siteHeaderElement);
render(new FilterView(), siteMainElement);
