import { OrderDTO } from "../schemas/dto"
import { Order } from "../schemas/models"
import { api } from "../providers"

const getAllOrders = (clientId?: number, vendorId?: string, date?: string) => api.get<Order[]>(`/order?clientId=${clientId}&vendorId=${vendorId}&date=${date}`)
const deleteOrder = (id: number) => api.delete(`/order/${id}`)
const getOrderById = (id: number) => api.get<Order>(`/order/${id}`)
const postOrder = (order: OrderDTO) => api.post<Order>(`/order`, order)

export const orderService = {
    getAllOrders,
    deleteOrder,
    getOrderById,
    postOrder
}