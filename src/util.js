import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

const TEXT_EXAMPLE = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const getRandomInteger = (min = 0, max = 1) => {
  min = Math.ceil(Math.min(min, max));
  max = Math.floor(Math.max(min, max));

  return Math.floor(min + Math.random() * (max - min + 1));
};

const getRandomFloat = (min = 0, max = 1, decimalCount = 1) => {
  const decimalFactor = Math.pow(10, decimalCount);

  min = Math.round(min * decimalFactor);
  max = Math.round(max * decimalFactor);

  return getRandomInteger(min, max) / decimalFactor;
};

const getArrayRandomElement = (array) => array[getRandomInteger(0, array.length - 1)];

const humanizeCommentDate = (date) => dayjs(date).format('YYYY/MM/DD HH:mm');
const humanizeReleaseDate = (date) => dayjs(date).format('D MMMM YYYY');
const humanizeYear = (date) => dayjs(date).format('YYYY');

const humanizeRuntime = (movieRuntime) => {
  dayjs.extend(duration);
  dayjs.extend(relativeTime);
  const durationData = dayjs.duration(movieRuntime, 'minutes').$d;
  return `${durationData.hours}h ${durationData.minutes}m`;
};

const getId = () => {
  let id = 0;
  return () => (id++).toString();
};

const getMockText = (MAX_SENTENCE_COUNT) => {
  const textArray = TEXT_EXAMPLE.split('. ');
  const sentenceCount = getRandomInteger(1, MAX_SENTENCE_COUNT);
  let mockText = '';
  for (let i = 0; i < sentenceCount; i++) {
    mockText += `${getArrayRandomElement(textArray)}. `;
  }
  return mockText.trim();
};

const getRandomBoolean = () => {
  const booleans = [true, false];
  return booleans[getRandomInteger(0, 1)];
};

export {
  getRandomInteger,
  getRandomFloat,
  getArrayRandomElement,
  humanizeCommentDate,
  humanizeReleaseDate,
  humanizeYear,
  humanizeRuntime,
  getId,
  getMockText,
  getRandomBoolean
};
