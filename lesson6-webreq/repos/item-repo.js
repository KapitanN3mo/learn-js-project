export class ItemRepo {
    constructor(base_url) {
        this.base_url = base_url
    }
    #request(url, method, body) {
        return fetch(url,
            {
                body: (body !== null) ? JSON.stringify(body) : null,
                method: method,
                headers: {
                    "Content-Type": "application/json",
                }
            }
        ).then((resp) => resp.json())
    }
    get(id) { }
    getAll() {
        return this.#request(`${this.base_url}/items`, "GET")
    }
    add(create_user) { }
    remove(id) { }
    update(base_user) { }
};

