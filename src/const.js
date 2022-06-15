const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'alreadyWatched',
  FAVORITES: 'favorite',
};

const filters = [
  {
    type: FilterType.ALL,
    name: 'All movies',
    url: 'all',
    isActive: true,
    count: 0,
  },
  {
    type: FilterType.WATCHLIST,
    name: 'Watchlist',
    url: 'watchlist',
    isActive: false,
    count: 0,
  },
  {
    type: FilterType.HISTORY,
    name: 'History',
    url: 'history',
    isActive: false,
    count: 0,
  },
  {
    type: FilterType.FAVORITES,
    name: 'Favorites',
    url: 'favorites',
    isActive: false,
    count: 0,
  },
];

const emojies = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

const UserAction = {
  UPDATE_MOVIE: 'UPDATE_MOVIE',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  SORT: 'SORT',
  BOARD: 'BOARD',
  MINOR: 'MINOR',
  POPUP_MINOR: 'POPUP_MINOR',
  POPUP_MAJOR: 'POPUP_MAJOR',
  FILTER: 'FILTER',
};

const MOVIES_COUNT = 17;
const MAX_MOVIE_COMMENT_COUNT = 10;
const COMMENTS_ALL_COUNT = MOVIES_COUNT * MAX_MOVIE_COMMENT_COUNT;

export {
  SortType,
  filters,
  FilterType,
  emojies,
  UserAction,
  UpdateType,
  MOVIES_COUNT,
  MAX_MOVIE_COMMENT_COUNT,
  COMMENTS_ALL_COUNT
};
