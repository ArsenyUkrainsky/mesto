export class UserInfo {
  constructor({ userName, userJob, userAvatar }) {
    this._userName = document.querySelector(userName)
    this._userJob = document.querySelector(userJob)
    this._userAvatar = document.querySelector(userAvatar)
  }
  getUserInfo() {
    const userData = {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent,
    }
    return userData
  }
  setUserInfo(inputData) {
    this._userAvatar.style.backgroundImage = `url(${inputData.avatar})`
    this._userName.textContent = inputData.name
    this._userJob.textContent = inputData.about
    //this._userAvatar.style.backgroundImage = "url('https://cs7062.vk.me/c540107/v540107359/2729/fYQlS_23QdA.jpg')"
  }
  renderNewAvatar(newAvatar) {
    return (this._userAvatar.style.backgroundImage = `url(${newAvatar.avatar})`)
  }
}
