import {getRandomInteger, getRandomFloat} from '../util.js';

const MOVIES_COUNT = 7;
const MAX_TOTAL_RAITING = 10;
const MAX_AGE_RAITING = 100;

const generateId = () => getRandomInteger(0, MOVIES_COUNT).toString();

const generateTitle = () => {
  const titles = [
    'Made for Each Other',
    'Popeye the Sailor Meets Sindbad the Sailor',
    'Sagebrush Trails',
    'Santa Claus Conquers the Martians',
    'The Dance of Life',
    'The Great Flamarion',
    'The Man with Golden Arm'
  ];

  return titles[getRandomInteger(0, titles.length - 1)];
};

const generateTotalRaiging = () => getRandomFloat(0, MAX_TOTAL_RAITING);
const generateAgeRaiting = () => getRandomInteger(0, MAX_AGE_RAITING);

const generatePoster = () => {
  const posters = [
    'made-for-each-other.png',
    'popeye-meets-sindbad.png',
    'santa-claus-conquers-the-maritians.jpg',
    'the-danc-of-life.jpg',
    'the-great-flamarion.jpg',
    'the-man-with-the-golden-arm.jpg'
  ];

  return posters[getRandomInteger(0, posters.length - 1)];
};

const generateDirector = () => {
  const directors = [
    'John Cromwell',
    'Dave Fleischer',
    'Armand Schaefer',
    'Nicholas Webster',
    'Willard Bowsky',
    'Anthony Mann',
    'Otto Preminger'
  ];

  return directors[getRandomInteger(0, directors.length - 1)];
};

const generateWriter = () => {
  const writers = [
    'Billy Wilder',
    'Ethan Coen and Joel Coen',
    'Robert Towne',
    'Quentin Tarantino',
    'Francis Ford Coppola',
    'William Goldman',
    'Charlie Kaufman'
  ];

  return writers[getRandomInteger(0, writers.length - 1)];
};

const generateActor = () => {
  const actors = [
    'Tom Hanks',
    'Gene Hackman',
    'Tommy Lee Jones',
    'Harrison Ford',
    'Dustin Hoffman',
    'Samuel L. Jackson',
    'Bruce Willis'
  ];

  return actors[getRandomInteger(0, actors.length - 1)];
};

const generateReleaseCountry = () => {
  const countries = [
    'United States',
    'Great Britan',
    'Finland',
    'France',
    'Italy',
    'Hungary',
    'Austria'
  ];

  return countries[getRandomInteger(0, countries.length - 1)];
};

export const generateMovie = () => ({
  id: generateId(),
  comments: [5, 6],
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
      'Comedy'
    ],
    description: 'Oscar-winning film, a war drama about two young people, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.'
  },
  userDetails: {
    watchlist: false,
    alreadyWatched: true,
    watchingDate: '2019-04-12T16:12:32.554Z',
    favorite: false
  }
});


