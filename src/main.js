import {render} from './render.js';
import UserTitleView from './view/user-title-view.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import StatisticsView from './view/statistics-view.js';
import ContentPresenter from './presenter/content-presenter.js';
import MoviesModel from './model/movies-model.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const footerStatisticsElement = siteFooterElement.querySelector('.footer__statistics');

const moviesModel = new MoviesModel();
const movies = moviesModel.movies;

render(new UserTitleView(), siteHeaderElement);
render(new FilterView(moviesModel), siteMainElement);
render(new SortView(), siteMainElement);

const contentPresenter = new ContentPresenter();
contentPresenter.init(siteMainElement, moviesModel);

render(new StatisticsView(movies), footerStatisticsElement);
