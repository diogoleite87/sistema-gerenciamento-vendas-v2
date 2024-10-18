import { Category } from "@prisma/client";

export interface CategoryDTO {
    name: string,
    description?: string
}

export interface CategoryRepository {
    updateCategoryById(id: number, category: CategoryDTO): Promise<Category>
    findCategoryByName(name: string): Promise<Category | null>
    createCategory(category: CategoryDTO): Promise<Category>
    deleteCategoryById(id: number): Promise<Category | null>
    findCategoryById(id: number): Promise<Category | null>
    findAllCategories(): Promise<Category[] | []>
}