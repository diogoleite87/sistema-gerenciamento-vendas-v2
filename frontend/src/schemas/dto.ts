export type LoginDTO = {
    email: string,
    password: string
}

export type UserDTO = {
    name: string,
    description: string,
    password: string,
    email: string
}

export type CustomerDTO = {
    cpf: string,
    name: string,
    phone: string,
    email: string,
    address: string,
}

export type CategoryDTO = {
    name: string,
    description: string,
}

export type ItemDTO = {
    name: string,
    description: string,
    value: number,
    stock: number,
    image: string,
    categoryId: number
}

export type OrderDTO = {
    clientId: number,
    vendorId: string,
    items: {
        id: number,
        quantity: number
    }[]
}