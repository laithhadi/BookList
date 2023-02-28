'use strict';
const AbstractAPIClient = require("./AbstractAPIClient");

module.exports = class GoogleBooksAPIClient extends AbstractAPIClient {
    constructor() {
        super();
        this.baseURL = "https://www.googleapis.com/books/v1/volumes";
        this.apiKey = process.env.API_KEY;
    }

    async fetchBookByName(bookName) {
        try {
            const params =
            {
                q: bookName,
                maxResults: 1,
                key: this.apiKey
            };
            const url = `${this.baseURL}?${new URLSearchParams(params)}`;
            const data = await this.fetchData(url);
            return data;
        } catch (error) {
            throw new Error(`Failed to fetch book by name ${cityName}. Error: ${error.message}`);
        }
    }
}