import Observable from '../framework/observable.js';
import { generateComment } from '../mock/comment.js';
import { COMMENTS_ALL_COUNT } from '../const.js';

export default class CommentsModel extends Observable {
  #comments = Array.from({length: COMMENTS_ALL_COUNT}, generateComment);

  get comments () {
    return this.#comments;
  }

  deleteComment(commentId) {
    const commentIndex = this.#comments.findIndex((comment) => comment.id === commentId);

    if (commentIndex === -1) {
      throw new Error('Can\'t delete unexiting comment');
    }

    this.#comments = [
      ...this.#comments.slice(0, commentIndex),
      ...this.#comments.slice(commentIndex + 1)
    ];
  }

  addComment(comment) {
    this.#comments = [
      ...this.#comments,
      comment,
    ];
  }
}
