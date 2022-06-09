import MoviesModel from './model/movies-model.js';
import CommentsModel from './model/comments-model.js';
import FiltersModel from './model/filters-model.js';
import StatisticsPresenter from './presenter/statistics-presenter.js';
import BoardPresenter from './presenter/board-presenter.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');

const moviesModel = new MoviesModel();
const commentsModel = new CommentsModel();
const filtersModel = new FiltersModel();

const boardPresenter = new BoardPresenter(siteMainElement, siteHeaderElement, moviesModel, commentsModel, filtersModel);
const statisticsPresenter = new StatisticsPresenter(footerStatisticsElement, moviesModel);

boardPresenter.init();
statisticsPresenter.init();
