import generateRandomInteger from '../util.js';

const MOVIES_COUNT = 7;

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

export const generateMovie = () => ({
  id: generateId(),
  comments: [5, 6],
  firlmInfo: {
    title: generateTitle(),
    alternativeTitle: generateTitle(),
    totalRating: 5.3,
    poster: 'images/posters/blue-blazes.jpg',
    ageRating: 0,
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


