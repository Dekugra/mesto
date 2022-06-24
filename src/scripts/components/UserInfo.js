export class UserInfo {
  constructor(profileAbout, profileAvatar, profileCohort, profileName, profileId) {
    this._about = document.querySelector(profileAbout);
    this._avatar = document.querySelector(profileAvatar);
    this._cohort = profileCohort;
    this._name = document.querySelector(profileName);
    this._id = profileId;
  }

  getUserInfo() {
    const userInfo = {
      about: this._about.textContent,
      avatar: this._avatar.src,
      cohort: this._cohort,
      name: this._name.textContent,
      _id: this._id,
    };

    return userInfo;
  }

  setUserInfo(object) {
    this._about.textContent = object.about;
    this._avatar.src = object.avatar;
    this._cohort = object.cohort;
    this._name.textContent = object.name;
    this._id = object._id;
  }
}
