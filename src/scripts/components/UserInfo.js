export class UserInfo {
  constructor(profileName, profileAbout) {
    this._name = document.querySelector(profileName);
    this._about = document.querySelector(profileAbout);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    };
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
  }
}
