import {generateRandomInteger, getRandomFloat, getRandomInteger} from '../util.js';

const MOVIES_COUNT = 7;
const MAX_TOTAL_RAITING = 10;
const MAX_AGE_RAITING = 100;

const generateId = () => generateRandomInteger(0, MOVIES_COUNT).toString();

const generateTitle = () => {
  const titles = [
    'Made for Each Other',
    'Popeye the Sailor Meets Sindbad the Sailor',
    'Sagebrush Trails',
    'Santa Claus Conquers the martians',
    'The Dance of Life',
    'The Grate Flamarion',
    'The Man with Golden Arm'
  ];

  return titles[generateRandomInteger(0, titles.length - 1)];
};

const getTotalRaiting = () => getRandomFloat(0, MAX_TOTAL_RAITING);
const getAgeRaiting = () => getRandomInteger(0, MAX_TOTAL_RAITING);

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

export const generateMovie = () => ({
  id: generateId(),
  comments: [5, 6],
  firlmInfo: {
    title: generateTitle(),
    alternativeTitle: generateTitle(),
    totalRating: getTotalRaiting(),
    poster: `images/posters/${generatePoster()}`,
    ageRating: getAgeRaiting(),
    director: 'Tom Ford',
    writers: [
      'Takeshi Kitano'
    ],
    actors: [
      'Morgan Freeman'
    ],
    release: {
      date: '2019-05-11T00:00:00.000Z',
      releaseCountry: 'Finland'
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


