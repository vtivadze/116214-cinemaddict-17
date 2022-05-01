import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

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

const humanizeDate = (date) => dayjs(date).format('DD MMMM YYYY');
const humanizeYear = (date) => dayjs(date).format('YYYY');

const humanizeDuration = (timeDuration) => {
  dayjs.extend(duration);
  dayjs.extend(relativeTime);
  const durationData = dayjs.duration(timeDuration, 'minutes').$d;
  return `${durationData.hours}h ${durationData.minutes}m`;
};

const getId = () => {
  let id = 0;
  return () => (id++).toString();
};

export {
  getRandomInteger,
  getRandomFloat,
  getArrayRandomElement,
  humanizeDate,
  humanizeYear,
  humanizeDuration,
  getId
};
