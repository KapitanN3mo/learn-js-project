import { GetUser, User, UpdateUser, CreateUser } from "../types/user"

export class UserRepo {
    storage_key: string
    counter_key: string

    constructor(storage_key: string) {
        this.storage_key = storage_key
        this.counter_key = storage_key + "_counter"
    }
    get(id: number): GetUser | undefined {
        return this.getAll().find((obj) => obj.id === id)
    }
    search(req: string): GetUser[] {
        return this.getAll().filter((obj) =>
            obj.firstname.includes(req) ||
            obj.lastname.includes(req) ||
            obj.patronymic.includes(req))
    }
    // update(id: number, product: UpdateProduct): Product | undefined {
    //     let items = this.getAll()
    //     const index = items.findIndex((item) => item.id === id)
    //     if (!index) {
    //         return undefined
    //     }
    //     items[index] = { ...items[index], ...product, id: id }
    //     this.save(items)
    //     return items[index]

    // }
    remove(id: number) {
        this.save(this.getAll().filter(obj => obj.id != id))
    }
    add(product: CreateUser): GetUser {
        let users = this.getAll()
        let new_user: User = { ..., id: this.getNewId() }
        products.push(new_product)
        this.save(products)
        return new_product
    }
    save(items: Product[]) {
        localStorage.setItem(this.storage_key, JSON.stringify(items))
    }
    getAll(): GetUser[] {
        let items = localStorage.getItem(this.storage_key)
        return (items !== null) ? JSON.parse(items) : new Array()
    }
    getNewId(): number {
        let current = Number(localStorage.getItem(this.counter_key))
        let new_id
        if (isNaN(current)) {
            new_id = 0
        } else {
            new_id = current + 1
        }
        localStorage.setItem(this.counter_key, `${new_id}`)
        return new_id
    }
}