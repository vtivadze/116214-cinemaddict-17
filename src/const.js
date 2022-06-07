const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const emojies = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

const UserAction = {
  CARD_CONTROLS: 'CARD_CONTROLS',
  SORT: 'SORT',
  FILTER: 'FILTER',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const UpdateType = {
  // click on buttons: toWatchelist, favorites
  FILTER: ['cards', 'filter'],

  // click on button: alreadyWathced
  PROFILE: ['cards', 'filter', 'profile'],

  // add, remove comment
  COMMENT: ['cards', 'most_commented'],

  // sort, filter
  BOARD: ['main_container'],

  // click on buttons: toWatchlist, favorites, alreadyWatched
  ACTIVE_FILTER: ['cards', 'filter', 'profile', 'main_container']
};
// 51 min
export {SortType, emojies, UserAction, UpdateType};
