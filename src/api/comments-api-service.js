import ApiService from '../framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export default class CommentsApiService extends ApiService {
  getMovieComments = (movieId) => (
    this._load({url: `comments/${movieId}`})
      .then(ApiService.parseResponse)
  );

  addComment = async (comment, movieId) => {
    const response = await this._load({
      url: `comments/${movieId}`,
      method: Method.PUT,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  deleteComment = async (commentId) => {
    const response = await this._load({
      url: `comments/${commentId}`,
      method: Method.DELETE,
    });

    return response;
  };
}
