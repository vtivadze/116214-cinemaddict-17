import UserProfilesModel from './model/user-profiles-model.js';
import UserProfilePresenter from './presenter/user-profile-presenter.js';
import MoviesModel from './model/movies-model.js';
import CommentsModel from './model/comments-model.js';
import FiltersModel from './model/filters-model.js';
import StatisticsPresenter from './presenter/statistics-presenter.js';
import BoardPresenter from './presenter/board-presenter.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');

const userProfileModel = new UserProfilesModel();
const moviesModel = new MoviesModel();
const commentsModel = new CommentsModel();
const filtersModel = new FiltersModel();

const userProfilePresenter = new UserProfilePresenter(siteHeaderElement, userProfileModel, moviesModel);
const boardPresenter = new BoardPresenter(siteMainElement, moviesModel, commentsModel, filtersModel);
const statisticsPresenter = new StatisticsPresenter(footerStatisticsElement, moviesModel);

userProfilePresenter.init();
boardPresenter.init();
statisticsPresenter.init();
