import UserProfilesModel from './model/user-profiles-model.js';
import UserProfilePresenter from './presenter/user-profile-presenter.js';
import MoviesModel from './model/movies-model.js';
import CommentsModel from './model/comments-model.js';
import FiltersModel from './model/filters-model.js';
import SortModel from './model/sort-model.js';
import StatisticsPresenter from './presenter/statistics-presenter.js';
import BoardPresenter from './presenter/board-presenter.js';
import MoviesApiService from './api/movies-api-service.js';
import CommentsApiService from './api/comments-api-service.js';

const AUTHORIZATION = 'Basic a58foKb0bHj190F3';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');

const userProfileModel = new UserProfilesModel();
const moviesModel = new MoviesModel(new MoviesApiService(END_POINT, AUTHORIZATION));
const commentsModel = new CommentsModel(new CommentsApiService(END_POINT, AUTHORIZATION));
const filtersModel = new FiltersModel();
const sortModel = new SortModel();


const userProfilePresenter = new UserProfilePresenter(siteHeaderElement, userProfileModel, moviesModel);
const boardPresenter = new BoardPresenter(siteMainElement, moviesModel, commentsModel, filtersModel, sortModel);
const statisticsPresenter = new StatisticsPresenter(footerStatisticsElement, moviesModel);

userProfilePresenter.init();
boardPresenter.init();
statisticsPresenter.init();
moviesModel.init();
