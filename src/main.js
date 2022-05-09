import {render} from './render.js';
import UserProfilePresenter from './presenter/user-profile-presenter.js';
import SortView from './view/sort-view.js';
import StatisticsView from './view/statistics-view.js';
import PagePresenter from './presenter/page-presenter.js';
import MoviesModel from './model/movies-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const footerStatisticsElement = siteFooterElement.querySelector('.footer__statistics');

const moviesModel = new MoviesModel();
const movies = moviesModel.movies;

const userProfilePresenter = new UserProfilePresenter(siteHeaderElement, moviesModel);
userProfilePresenter.render();

const filterPresenter = new FilterPresenter(siteMainElement, moviesModel);
filterPresenter.init();

render(new SortView(), siteMainElement);

const contentPresenter = new PagePresenter();
contentPresenter.init(siteMainElement, moviesModel);

render(new StatisticsView(movies), footerStatisticsElement);
