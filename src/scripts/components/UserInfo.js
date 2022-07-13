export class UserInfo {
  constructor(profileName, profileAbout, profileAvatar) {
    this._name = document.querySelector(profileName);
    this._about = document.querySelector(profileAbout);
    this._avatar = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    };
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar = avatar;
    this._id = _id;
  }

  getOwnerId() {
    return this._id;
  }

  setAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
