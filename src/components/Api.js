export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getUserInfo() {
        return fetch(this._baseUrl + '/users/me', {
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    const resJson = res.json();
                    console.log(resJson);
                    return resJson;
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    getCards() {
        return fetch(this._baseUrl + '/cards', {
            headers: this.headers
        })
            .then(res => {
              if (res.ok) {
                const resJson = res.json();
                console.log(resJson);
                return resJson;
            }

                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }



    // другие методы работы с API
}



