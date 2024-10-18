import { Customer } from "@prisma/client"

export interface CustomerDTO {
    cpf: string,
    name: string,
    phone: string,
    email: string,
    address: string
}

export interface CustomerRepository {
    updateCustomerById(id: number, customer: CustomerDTO): Promise<Customer | null>
    createCustomer(customer: CustomerDTO): Promise<Customer>
    findCustomerByCpf(cpf: string): Promise<Customer | null>
    deleteCustomerById(id: number): Promise<Customer | null>
    findCustomerById(id: number): Promise<Customer | null>
    findAllCustomers(): Promise<Customer[] | []>
}