import { generateMovie } from '../mock/movie';

const MOVIES_COUNT = 9;

export default class MoviesModel {
  movies = Array.from({length: MOVIES_COUNT}, generateMovie);

  getMovies = () => this.movies;
}
