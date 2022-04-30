import {render, RenderPosition} from './render.js';
import UserTitleView from './view/user-title-view.js';
import MenuView from './view/menu-view.js';
import SortView from './view/sort-view.js';
import StatisticsView from './view/statistics-view.js';
import PopupView from './view/popup-view.js';
import ContentPresenter from './presenter/content-presenter.js';
import MoviesModel from './model/movies-model.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const footerStatisticsElement = siteFooterElement.querySelector('.footer__statistics');

render(new UserTitleView(), siteHeaderElement);
render(new MenuView(), siteMainElement);
render(new SortView(), siteMainElement);

const contentPresenter = new ContentPresenter();
const moviesModel = new MoviesModel();
contentPresenter.init(siteMainElement, moviesModel);

render(new StatisticsView(), footerStatisticsElement);
// render(new PopupView(), siteFooterElement, RenderPosition.AFTEREND);
