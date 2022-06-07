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

const getRandomBoolean = () => Boolean(getRandomInteger(0, 1));

const getRandomeDate = (maxPassedDays) => {
  const daysGap = getRandomInteger(0, maxPassedDays);
  const hoursGap = getRandomInteger(-24, 24);
  return dayjs().add(-daysGap, 'day').add(hoursGap, 'hour').toDate();
};

const isEscape = (code) => code === 'Escape';

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortMovieByDate = (movieA, movieB) => {
  const weight = getWeightForNullDate(movieA.filmInfo.release.date, movieB.filmInfo.release.date);

  return weight ?? dayjs(movieB.filmInfo.release.date).diff(dayjs(movieA.filmInfo.release.date));
};

const sortMovieByRating = (movieA, movieB) => movieB.filmInfo.totalRating - movieA.filmInfo.totalRating;

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
  getRandomBoolean,
  getRandomeDate,
  isEscape,
  sortMovieByDate,
  sortMovieByRating
};
