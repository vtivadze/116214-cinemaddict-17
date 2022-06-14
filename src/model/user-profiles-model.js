export default class UserProfilesModel {
  #userProfiles = [
    {
      title: 'novice',
      image: 'bitmap.png',
      range: {min: 1, max: 10},
    },
    {
      title: 'fan',
      image: 'bitmap@2x.png',
      range: {min: 11, max: 20},
    },
    {
      title: 'movie buff',
      image: 'bitmap@3x.png',
      range: {min: 21, max: Number.POSITIVE_INFINITY},
    },
  ];

  get userProfiles() {
    return this.#userProfiles;
  }
}
