export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _resolve = (res) => {
        if (res.ok) {
            const resJson = res.json();
            return resJson;
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    };

    postUserInfo(values) {
        return fetch(this._baseUrl + '/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify ({
                name: values.name,
                about: values.job
            })
        })
            .then(this._resolve);
    }

    getUserInfo() {
        return fetch(this._baseUrl + '/users/me', {
            headers: this._headers
        })
            .then(this._resolve);
    }

    getCards() {
        return fetch(this._baseUrl + '/cards', {
            headers: this._headers
        })
            .then(this._resolve);
    }

    postCard(name, link) {
        return fetch(this._baseUrl + '/cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        }).then(this._resolve);
    }

    deleteCard(cardId) {
        return fetch(this._baseUrl + '/cards/' + cardId, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._resolve);
    }

    editAvatar(src) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: src
            })
        })
            .then(this._resolve);
    }

    setLike(cardId) {
        return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(this._resolve);
    }

    deleteLike(cardId) {
        return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._resolve);
    }
    // другие методы работы с API
}



