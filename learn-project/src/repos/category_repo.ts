import type { ProductCategory, CreateProductCategory, UpdateProductCategory } from "../types/product_category"

export class CategoryRepo {
    storage_key: string
    counter_key: string

    constructor(storage_key: string) {
        this.storage_key = storage_key
        this.counter_key = storage_key + "_counter"
    }
    get(id: number): ProductCategory | undefined {
        return this.getAll().find((prod) => prod.id === id)
    }
    search(req: string): ProductCategory[] {
        return this.getAll().filter((prod) => prod.name.includes(req))
    }
    update(id: number, product: UpdateProductCategory): ProductCategory | undefined {
        let items = this.getAll()
        const index = items.findIndex((item) => item.id === id)
        if (!index) {
            return undefined
        }
        items[index] = { ...items[index], ...product, id: id }
        this.save(items)
        return items[index]

    }
    remove(id: number) {
        this.save(this.getAll().filter(prod => prod.id != id))
    }
    add(product: CreateProductCategory): ProductCategory {
        let products = this.getAll()
        let new_product: ProductCategory = { ...product, id: this.getNewId() }
        products.push(new_product)
        this.save(products)
        return new_product
    }
    save(items: ProductCategory[]) {
        localStorage.setItem(this.storage_key, JSON.stringify(items))
    }
    getAll(): ProductCategory[] {
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