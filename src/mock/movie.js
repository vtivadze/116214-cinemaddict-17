import {getRandomInteger, getRandomFloat, getArrayRandomElement} from '../util.js';

const MOVIES_COUNT = 7;
const MAX_TOTAL_RAITING = 10;
const MAX_AGE_RAITING = 100;
const MAX_COMMENT_ID = 100;

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
  'popeye-meets-sindbad.png',
  'santa-claus-conquers-the-maritians.jpg',
  'the-danc-of-life.jpg',
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

const DESCRIPTIONS = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const generateId = () => getRandomInteger(0, MOVIES_COUNT).toString();
const generateTitle = () => getArrayRandomElement(TITLES);
const generateTotalRaiging = () => getRandomFloat(0, MAX_TOTAL_RAITING);
const generateAgeRaiting = () => getRandomInteger(0, MAX_AGE_RAITING);
const generateCommentId = () => getRandomInteger(0, MAX_COMMENT_ID);
const generatePoster = () => getArrayRandomElement(POSTERS);
const generateDirector = () => getArrayRandomElement(DIRECTORS);
const generateWriter = () => getArrayRandomElement(WRITERS);
const generateActor = () => getArrayRandomElement(ACTORS);
const generateReleaseCountry = () => getArrayRandomElement(COUNTRIES);
const generateGenre = () => getArrayRandomElement(GENRES);
const generateDescription = () => getArrayRandomElement(DESCRIPTIONS.split('. '));


export const generateMovie = () => ({
  id: generateId(),
  comments: [
    generateCommentId(),
    generateCommentId()
  ],
  firlmInfo: {
    title: generateTitle(),
    alternativeTitle: generateTitle(),
    totalRating: generateTotalRaiging(),
    poster: `images/posters/${generatePoster()}`,
    ageRating: generateAgeRaiting(),
    director: generateDirector(),
    writers: [
      generateWriter()
    ],
    actors: [
      generateActor(),
      generateActor()
    ],
    release: {
      date: '2019-05-11T00:00:00.000Z',
      releaseCountry: generateReleaseCountry()
    },
    runtime: 77,
    genre: [
      generateGenre(),
      generateGenre(),
      generateGenre()
    ],
    description: generateDescription()
  },
  userDetails: {
    watchlist: false,
    alreadyWatched: true,
    watchingDate: '2019-04-12T16:12:32.554Z',
    favorite: false
  }
});


