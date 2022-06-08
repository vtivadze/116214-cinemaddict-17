import MoviesModel from './model/movies-model.js';
import CommentsModel from './model/comments-model.js';

import FilterPresenter from './presenter/filter-presenter.js';
import StatisticsPresenter from './presenter/statistics-presenter.js';
import BoardPresenter from './presenter/board-presenter.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const footerStatisticsElement = siteFooterElement.querySelector('.footer__statistics');

const moviesModel = new MoviesModel();
const commentsModel = new CommentsModel();

const filterPresenter = new FilterPresenter(siteMainElement);
filterPresenter.init(moviesModel);

const boardPresenter = new BoardPresenter(siteMainElement, siteHeaderElement, moviesModel, commentsModel, filterPresenter);
boardPresenter.init();

const statisticsPresenter = new StatisticsPresenter(footerStatisticsElement, moviesModel);
statisticsPresenter.init();
