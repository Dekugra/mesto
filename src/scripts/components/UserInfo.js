export class UserInfo {
  constructor(profileName, profileAbout) {
    this._name = document.querySelector(profileName);
    this._about = document.querySelector(profileAbout);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.username = this._name.textContent;
    userInfo.about = this._about.textContent;
    return userInfo;
  }

  setUserInfo(object) {
    this._name.textContent = object.username;
    this._about.textContent = object.about;
  }
}
