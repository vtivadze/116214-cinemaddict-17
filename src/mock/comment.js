import {
  getId,
  getArrayRandomElement,
  getMockText
} from '../util.js';

const MAX_COMMENTS_SENTENCE_COUNT = 3;

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

export const generateComment = () => ({
  id: generateId(),
  author: generateAuthor(),
  comment: generateCommentsText(),
  date: '2019-05-11T16:12:32.554Z',
  emotion: generateEmotion()
});
