export interface Product {
    id: number
    attributes: {
        name: string
        description: string
        price: number
        image: {
            url: string
        }
    }
}

// export category
export interface Category {
    id: number
    name: string
    products: Product[]
}

export interface Locale {
    code: string
    name: string
}