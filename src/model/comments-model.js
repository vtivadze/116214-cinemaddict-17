import { generateComment } from '../mock/comment.js';

const COMMENTS_COUNT = 5;

export default class CommentsModel {
  comments = Array.from({length: COMMENTS_COUNT}, generateComment);

  getComments = () => this.comments;
}
