import type { CreateProduct, Product } from "../types/product"

export class ProductRepo {
    storage_key: string
    counter_key: string

    constructor(storage_key: string) {
        this.storage_key = storage_key
        this.counter_key = storage_key + "_counter"
    }
    add(product: CreateProduct): Product {
        let products = this.getAll()
        let new_product: Product = { ...product, id: this.getNewId() }
        products.push(new_product)

    }
    save(items: Product[]) {
        localStorage.setItem(this.storage_key, JSON.stringify(items))
    }
    getAll(): Product[] {
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