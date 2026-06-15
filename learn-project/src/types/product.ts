export type Product = {
    id: number
    name: string
    category_id: number
    description: SVGStringList
    price: number // float
    quantity: number
}

export type CreateProduct = {
    name: string
    category_id: number
    description: string
    price: number // float
    quantity: number
}

export type UpdateProduct = CreateProduct;