import { api } from "../providers"
import { Customer } from "../schemas/models"
import { CustomerDTO } from "../schemas/dto"


const getAllCustomers = () => api.get<Customer[]>(`/customer`)
const postCustomer = (costumer: CustomerDTO) => api.post<Customer>(`/customer`, costumer)
const deleteCustomer = (id: number) => api.delete(`/customer/${id}`)
const putCustomer = (costumer: CustomerDTO, id: number) => api.put<Customer>(`/customer/${id}`, costumer)

export const customerService = {
    getAllCustomers,
    postCustomer,
    deleteCustomer,
    putCustomer
}