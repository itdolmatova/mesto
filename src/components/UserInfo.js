export default class UserInfo {
    constructor(nameUserSelector, jobUserSelector, avatarSelector) {
        this._nameUser = document.querySelector(nameUserSelector);
        this._jobUser = document.querySelector(jobUserSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        const userInfo = {};
        userInfo.name = this._nameUser.textContent;
        userInfo.job = this._jobUser.textContent;
        userInfo._id = this._id;
        return userInfo;
    }

    setUserInfo(userInfo) {
        this._nameUser.textContent = userInfo.name;
        this._jobUser.textContent = userInfo.job;
        this._avatar.src = userInfo.avatar;
        this._id = userInfo._id;
    }
}