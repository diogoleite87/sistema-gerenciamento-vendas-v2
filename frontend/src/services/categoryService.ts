import { CategoryDTO } from "../schemas/dto"
import { Category } from "../schemas/models"
import { api } from "../providers"


const getAllCategories = () => api.get<Category[]>(`/category`)
const postCategory = (category: CategoryDTO) => api.post<Category>(`/category`, category)
const deleteCategory = (id: number) => api.delete(`/category/${id}`)
const putCategory = (category: CategoryDTO, id: number) => api.put<Category>(`/category/${id}`, category)

export const categoryService = {
    getAllCategories,
    postCategory,
    deleteCategory,
    putCategory
}