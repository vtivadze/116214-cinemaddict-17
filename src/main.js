import {render, RenderPosition} from './render.js';
import UserTitleView from './view/user-title-view.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import StatisticsView from './view/statistics-view.js';
import PopupView from './view/popup-view.js';
import CommentView from './view/comment-view.js';
import ContentPresenter from './presenter/content-presenter.js';
import MoviesModel from './model/movies-model.js';
import CommentsModel from './model/comments-model.js';
import { getRandomInteger } from './util.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const footerStatisticsElement = siteFooterElement.querySelector('.footer__statistics');

const moviesModel = new MoviesModel();
const movies = moviesModel.getMovies();

render(new UserTitleView(), siteHeaderElement);
render(new FilterView(moviesModel), siteMainElement);
render(new SortView(), siteMainElement);

const contentPresenter = new ContentPresenter();
contentPresenter.init(siteMainElement, moviesModel);

render(new StatisticsView(movies), footerStatisticsElement);

const movie = movies[getRandomInteger(0, movies.length - 1)];
render(new PopupView(movie), siteFooterElement, RenderPosition.AFTEREND);

const commentsListElement = document.querySelector('.film-details__comments-list');
const commentsModel = new CommentsModel();
const comments = commentsModel.getComments();
for (let i = 0; i < comments.length; i++) {
  render(new CommentView(comments[i]), commentsListElement);
}
