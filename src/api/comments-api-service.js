import ApiService from '../framework/api-service.js';

export default class ComponentsApiService extends ApiService {
  getMoviecComments = (movieId) => (
    this._load({url: `comments/${movieId}`})
      .then(ApiService.parseResponse)
  );
}
