export class StringRepo {
    constructor(key) {
        this.storage_key = key
    }
    get(index) {
        return this.getAll().at(index)
    }
    getAll() {
        let items = localStorage.getItem(this.storage_key)
        return (items !== null) ? JSON.parse(items) : new Array()
    }
    add(s) {
        const items = this.getAll()
        items.push(s)
        this.save(items)
    }
    set(index, s) {
        const items = this.getAll()
        items[index] = s
        this.save(items)
    }
    save(items) {
        localStorage.setItem(this.storage_key, JSON.stringify(items))
    }
    clear() {
        localStorage.clear(this.storage_key)
    }

}