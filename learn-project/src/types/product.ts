export type Product = {
    id: number
    name: string
    category_id: number
    description: string
    price: number // float
    quantity: number
    image: string
}

export type CreateProduct = {
    name: string
    category_id: number
    description: string
    price: number // float
    quantity: number
    image: string
}

export type UpdateProduct = CreateProduct;