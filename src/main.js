import {render} from './framework/render.js';
import MoviesModel from './model/movies-model.js';
import ContentContainerView from './view/content-container-view.js';
import SortView from './view/sort-view.js';
import UserProfilePresenter from './presenter/user-profile-presenter.js';
import MainContentPresenter from './presenter/main-content-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import MostCommentedPresenter from './presenter/most-commented-presenter.js';
import TopRatedPresenter from './presenter/top-rated-presenter.js';
import CommentsModel from './model/comments-model.js';
import StatisticsPresenter from './presenter/statistics-presenter.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const footerStatisticsElement = siteFooterElement.querySelector('.footer__statistics');

const moviesModel = new MoviesModel();
const commentsModel = new CommentsModel();

const userProfilePresenter = new UserProfilePresenter(siteHeaderElement, moviesModel);
userProfilePresenter.render();

const filterPresenter = new FilterPresenter(siteMainElement, moviesModel);
filterPresenter.init();

render(new SortView(), siteMainElement);

const contentContainerComponent = new ContentContainerView();
render(contentContainerComponent, siteMainElement);

const mainContentPresenter = new MainContentPresenter(contentContainerComponent.element, moviesModel, commentsModel);
mainContentPresenter.init();

const mostCommentedPresenter = new MostCommentedPresenter(contentContainerComponent.element, moviesModel, commentsModel);
mostCommentedPresenter.init();

const topRatedPresenter = new TopRatedPresenter(contentContainerComponent.element, moviesModel, commentsModel);
topRatedPresenter.init();

const statisticsPresenter = new StatisticsPresenter(footerStatisticsElement, moviesModel);
statisticsPresenter.init();
