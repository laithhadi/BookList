import axios from "axios";
const baseURL = "http://localhost:3001/"
const booksURL = "http://localhost:3001/books/"
const usersURL = "http://localhost:3001/users/"
const loginURL = "http://localhost:3001/login/"

export class ApiClient {
    constructor(tokenProvider, logoutHandler) {
        this.tokenProvider = tokenProvider;
        this.logoutHandler = logoutHandler;
    }

    authenticatedCall(method, url, data) {
        return axios({
            method,
            url,
            headers: {
                authorization: this.tokenProvider()
            },
            data,
        }).catch((err) => {
            if (err.response.status === 401 || err.response.status === 403) {
                this.logoutHandler();
            } else {
                throw err;
            }
        })
    }

    getBooks() {
        return this.authenticatedCall("get", booksURL);
    }

    addBook(name, author, isRead) {
        return this.authenticatedCall("post", `${booksURL}/create`, { name, author, isRead });
    }

    updateBook(id, name, author, isRead) {
        return this.authenticatedCall("put", `${booksURL}${id}`, { name, author, isRead })
    }

    deleteBook(id) {
        return this.authenticatedCall("delete", `${booksURL}${id}`);
    }

    async login(username, password) {
        const res = await axios.post(`${loginURL}auth`, { username, password });
        return res;
    }
}