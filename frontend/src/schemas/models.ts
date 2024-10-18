export type Theme = 'dark' | 'light'

export type User = {
    id: string,
    email: string,
    name: string,
    type: number,
    description: string
}

export type AuthData = {
    user_token: string | null | undefined
    user: User
}

export type Profile = {
    id: string,
    email: string,
    name: string,
    type: 1 | 2,
    description: string
}

export type Customer = {
    id: number,
    cpf: string,
    name: string,
    phone: string,
    email: string,
    address: string,
}

export type Category = {
    id: number,
    name: string,
    description: string,
}

export type Item = {
    id: number,
    name: string,
    description: string,
    value: number,
    stock: number,
    image: string,
    category: Category
}

export type Order = {
    id: number,
    value: number,
    vendor: Partial<User>,
    client: Partial<Customer>
    items: {
        id: number,
        quantity: number,
        value: number,
        item: Partial<Item>
    }[]
}