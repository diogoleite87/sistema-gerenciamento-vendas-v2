import { ItemDTO } from "../schemas/dto"
import { Item } from "../schemas/models"
import { api } from "../providers"


const getAllItems = (categoryId?: number) => api.get<Item[]>(`/item?categoryId=${categoryId}`)
const postItem = (item: ItemDTO) => api.post<Item>(`/item`, item)
const deleteItem = (id: number) => api.delete(`/item/${id}`)
const putItem = (item: Partial<ItemDTO>, id: number) => api.put<Item>(`/item/${id}`, item)

export const itemService = {
    getAllItems,
    postItem,
    deleteItem,
    putItem
}