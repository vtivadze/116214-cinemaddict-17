import ApiService from '../framework/api-service.js';

export default class CommentsApiService extends ApiService {
  getMovieComments = (movieId) => (
    this._load({url: `comments/${movieId}`})
      .then(ApiService.parseResponse)
  );
}
