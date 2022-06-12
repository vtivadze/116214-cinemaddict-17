import Observable from '../framework/observable.js';
import { generateComment } from '../mock/comment.js';
import { COMMENTS_ALL_COUNT } from '../const.js';

export default class CommentsModel extends Observable {
  #comments = Array.from({length: COMMENTS_ALL_COUNT}, generateComment);

  get comments () {
    return this.#comments;
  }
}
