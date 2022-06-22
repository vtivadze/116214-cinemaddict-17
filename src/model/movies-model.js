import dayjs from 'dayjs';
import { UpdateType } from '../const.js';
import Observable from '../framework/observable.js';

export default class MoviesModel extends Observable {
  #moviesApiService = null;
  #movies = [];

  constructor(moviesApiService) {
    super();
    this.#moviesApiService = moviesApiService;
  }

  get movies() {
    return this.#movies;
  }

  getMovie(movieId) {
    return this.movies.find((movie) => movie.id === movieId);
  }

  init = async () => {
    let updateType = null;

    try {
      const movies = await this.#moviesApiService.movies;
      this.#movies = movies.map(this.#adaptToClient);
      updateType = UpdateType.INIT;
    } catch(err) {
      this.#movies = [];
      updateType = UpdateType.MOVIE_LOAD_ERROR;
    }

    this._notify(updateType);
  };

  updateMovie = async (updateType, update) => {
    const index = this.#movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexiting movie');
    }

    try {
      const updatedMovie = await this.#moviesApiService.updateMovie(update);

      const adaptedMovie = this.#adaptToClient(updatedMovie);

      this.#movies = [
        ...this.#movies.slice(0, index),
        adaptedMovie,
        ...this.#movies.slice(index + 1)
      ];

      this._notify(updateType, adaptedMovie);
    } catch(err) {
      throw new Error('Can\'t update movie');
    }
  };

  updateMoviesModel(update) {
    const index = this.#movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexiting movie');
    }

    const adaptedMovie = this.#adaptToClient(update);

    this.#movies = [
      ...this.#movies.slice(0, index),
      adaptedMovie,
      ...this.#movies.slice(index + 1)
    ];
  }

  #adaptToClient = (movie) => {
    if (movie.filmInfo) {
      return movie;
    }

    const adaptedMovie = {...movie,
      filmInfo: {...movie.film_info,
        ageRating: movie.film_info.age_rating,
        alternativeTitle: movie.film_info.alternative_title,
        totalRating: movie.film_info.total_rating,
        release: {...movie.film_info.release,
          releaseCountry: movie.film_info.release.release_country,
        },
      },
      userDetails: {...movie.user_details,
        alreadyWatched: movie.user_details.already_watched,
        watchingDate: movie.user_details.watching_date && dayjs(movie.user_details.watching_date).toDate(),
      },
    };

    delete(adaptedMovie.film_info);
    delete(adaptedMovie.user_details);

    delete(adaptedMovie.filmInfo.age_rating);
    delete(adaptedMovie.filmInfo.alternative_title);
    delete(adaptedMovie.filmInfo.total_rating);
    delete(adaptedMovie.filmInfo.release.release_country);

    delete(adaptedMovie.userDetails.already_watched);
    delete(adaptedMovie.userDetails.watching_date);

    return adaptedMovie;
  };
}
