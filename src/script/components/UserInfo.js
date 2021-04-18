export class UserInfo {
  constructor({ userName, userJob }) {
    this._userName = document.querySelector(userName)
    this._userJob = document.querySelector(userJob)
  }
  getUserInfo() {
    const userProfile = {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent,
    }
    return userProfile
  }
  setUserInfo(inputData) {
    this._userName.textContent = inputData.name
    this._userJob.textContent = inputData.characteristic
  }
}
