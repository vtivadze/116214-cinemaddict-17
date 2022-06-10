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
  POPUP_PATCH: 'POPUP_PATCH',
  MINOR: 'MINOR',
  POPUP_MINOR: 'POPUP_MINOR',
  FILTER: 'FILTER',
};

export {
  SortType,
  filters,
  FilterType,
  emojies,
  UserAction,
  UpdateType,
};
