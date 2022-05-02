import {
  getId,
  getArrayRandomElement,
  getMockText,
  getRandomeDate
} from '../util.js';

const MAX_COMMENTS_SENTENCE_COUNT = 3;
const DAYS_IN_YEAR = 365;

const AUTHORS = [
  'Smith Johnson',
  'Williams Brown',
  'David Miller',
  'Ricardo Rodriguez',
  'Fernando Lopez',
  'Tom Taylor',
  'Samuel Jackson',
  'John Lewis',
  'Martin Robinson'
];

const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];

const generateId = getId();
const generateAuthor = () => getArrayRandomElement(AUTHORS);
const generateCommentsText = () => getMockText(MAX_COMMENTS_SENTENCE_COUNT);
const generateEmotion = () => getArrayRandomElement(EMOTIONS);
const generateCommentDate = () => getRandomeDate(DAYS_IN_YEAR);

export const generateComment = () => ({
  id: generateId(),
  author: generateAuthor(),
  comment: generateCommentsText(),
  date: generateCommentDate(),
  emotion: generateEmotion()
});
