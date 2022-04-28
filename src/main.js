import {render} from './render.js';
import UserTitleView from './view/user-title-view.js';
import MenuView from './view/menu-view.js';
import SortView from './view/sort-view.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

render(new UserTitleView(), siteHeaderElement);
render(new MenuView(), siteMainElement);
render(new SortView(), siteMainElement);
