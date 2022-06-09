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

const userTitles = [
  {min: 0, max: 0, title: ''},
  {min: 1, max: 10, title: 'novice'},
  {min: 11, max: 20, title: 'fan'},
  {min: 21, max: Number.POSITIVE_INFINITY, title: 'movie buff'},
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
  POPUP_PATCH: 'POPUP_PATCH',
  MINOR: 'MINOR',
  POPUP_MINOR: 'POPUP_MINOR',
  FILTER: 'FILTER',
};

export {SortType, filters, FilterType, emojies, UserAction, UpdateType, userTitles};
