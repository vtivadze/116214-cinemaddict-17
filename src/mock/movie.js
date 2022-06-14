import {
  getRandomInteger,
  getRandomFloat,
  getArrayRandomElement,
  getId,
  getMockText,
  getRandomBoolean,
  getRandomeDate
} from '../utils/util.js';
import {nanoid} from 'nanoid';
import { MAX_MOVIE_COMMENT_COUNT } from '../const.js';

const MAX_TOTAL_RAITING = 10;
const MAX_AGE_RAITING = 100;
const MAX_WRITERS_COUNT = 3;
const MAX_ACTORS_COUNT = 5;
const MAX_GENRES_COUNT = 3;
const MAX_DESCRIPTIONS_SENTENCE_COUNT = 5;
const MIN_RUNTIME_MINUTES = 60;
const MAX_RUNTIME_MINUTES = 150;
const DAYS_IN_YEAR = 365;

const TITLES = [
  'Made for Each Other',
  'Popeye the Sailor Meets Sindbad the Sailor',
  'Sagebrush Trails',
  'Santa Claus Conquers the Martians',
  'The Dance of Life',
  'The Great Flamarion',
  'The Man with Golden Arm'
];

const POSTERS = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg'
];

const DIRECTORS = [
  'John Cromwell',
  'Dave Fleischer',
  'Armand Schaefer',
  'Nicholas Webster',
  'Willard Bowsky',
  'Anthony Mann',
  'Otto Preminger'
];

const WRITERS = [
  'Billy Wilder',
  'Ethan Coen and Joel Coen',
  'Robert Towne',
  'Quentin Tarantino',
  'Francis Ford Coppola',
  'William Goldman',
  'Charlie Kaufman'
];

const ACTORS = [
  'Tom Hanks',
  'Gene Hackman',
  'Tommy Lee Jones',
  'Harrison Ford',
  'Dustin Hoffman',
  'Samuel L. Jackson',
  'Bruce Willis'
];

const COUNTRIES = [
  'United States',
  'Great Britan',
  'Finland',
  'France',
  'Italy',
  'Hungary',
  'Austria'
];

const GENRES = [
  'Action',
  'Comedy',
  'Drama',
  'Fantasy',
  'Horror',
  'Mystery',
  'Romance',
  'Thriller',
  'Western',
];

const generateTitle = () => getArrayRandomElement(TITLES);
const generateTotalRating = () => getRandomFloat(0, MAX_TOTAL_RAITING);
const generateAgeRating = () => getRandomInteger(0, MAX_AGE_RAITING);
const generatePoster = () => getArrayRandomElement(POSTERS);
const generateDirector = () => getArrayRandomElement(DIRECTORS);
const generateReleaseCountry = () => getArrayRandomElement(COUNTRIES);
const generateRuntime = () => getRandomInteger(MIN_RUNTIME_MINUTES, MAX_RUNTIME_MINUTES);
const generateDescription = () => getMockText(MAX_DESCRIPTIONS_SENTENCE_COUNT);
const generateWatchList = () => getRandomBoolean();
const generateAlreadyWatched = () => getRandomBoolean();
const generateFavorite = () => getRandomBoolean();
const generateReleaseDate = () => getRandomeDate(DAYS_IN_YEAR * 100);
const generateWatchingDate = () => getRandomeDate(DAYS_IN_YEAR * 10);
const generateCommentId = getId();

const generateCommentIdsArray = () => {
  const commentsCount = getRandomInteger(0, MAX_MOVIE_COMMENT_COUNT);
  return Array.from({length: commentsCount}, generateCommentId);
};

const generateWritersArray = () => {
  const generateWriter = () => getArrayRandomElement(WRITERS);
  const writersCount = getRandomInteger(1, MAX_WRITERS_COUNT);
  return Array.from({length: writersCount}, generateWriter);
};

const generateActorsArray = () => {
  const generateActor = () => getArrayRandomElement(ACTORS);
  const actorsCount = getRandomInteger(1, MAX_ACTORS_COUNT);
  return Array.from({length: actorsCount}, generateActor);
};

const generateGenresArray = () => {
  const generateGenre = () => getArrayRandomElement(GENRES);
  const genresCount = getRandomInteger(1, MAX_GENRES_COUNT);
  return Array.from({length: genresCount}, generateGenre);
};

export const generateMovie = () => ({
  id: nanoid(),
  comments: generateCommentIdsArray(),
  filmInfo: {
    title: generateTitle(),
    alternativeTitle: generateTitle(),
    totalRating: generateTotalRating(),
    poster: generatePoster(),
    ageRating: generateAgeRating(),
    director: generateDirector(),
    writers: generateWritersArray(),
    actors: generateActorsArray(),
    release: {
      date: generateReleaseDate(),
      releaseCountry: generateReleaseCountry()
    },
    runtime: generateRuntime(),
    genre: generateGenresArray(),
    description: generateDescription()
  },
  userDetails: {
    watchlist: generateWatchList(),
    alreadyWatched: generateAlreadyWatched(),
    watchingDate: generateWatchingDate(),
    favorite: generateFavorite()
  }
});


