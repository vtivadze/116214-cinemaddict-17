const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

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
  MINOR_ONE: 'MINOR_ONE',
  MAJOR: 'MAJOR',
};

export {SortType, FilterType, emojies, UserAction, UpdateType};
