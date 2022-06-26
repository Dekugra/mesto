export class UserInfo {
  constructor(profileName, profileAbout, profileAvatar) {
    this._name = document.querySelector(profileName);
    this._about = document.querySelector(profileAbout);
    this._avatar = document.querySelector(profileAvatar);
    this._id = 0;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    };
  }

  setUserInfo({ _id, name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._id = _id;
  }

  getOwnerId() {
    return this._id;
  }

  getAvatar() {
    return this._avatar.src;
  }

  setAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
