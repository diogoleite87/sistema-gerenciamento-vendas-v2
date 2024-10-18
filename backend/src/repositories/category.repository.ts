import { CategoryDTO, CategoryRepository } from "../interfaces/category.interface";
import { prisma } from "../database/prisma-client";
import { Category } from "@prisma/client";


class CategoryRepositoryPrisma implements CategoryRepository {

    async findCategoryByName(name: string): Promise<Category | null> {

        const result = await prisma.category.findFirst({
            where: {
                name,
                AND: {
                    deleted: false
                }
            }
        });

        return result || null;
    }

    async createCategory(category: CategoryDTO): Promise<Category> {

        const result = await prisma.category.create({
            data: {
                name: category.name,
                description: category.description,
                deleted: false
            }
        });

        return result;
    }

    async deleteCategoryById(id: number): Promise<Category | null> {

        const result = await prisma.category.update({
            where: {
                id
            },
            data: {
                deleted: true
            }
        });

        return result || null;
    }

    async findAllCategories(): Promise<Category[] | []> {

        const result = await prisma.category.findMany({
            where: {
                deleted: false
            }
        });

        return result;
    }

    async findCategoryById(id: number): Promise<Category | null> {

        const result = await prisma.category.findUnique({
            where: {
                id,
                AND: {
                    deleted: false
                }
            }
        })

        return result || null;
    }

    async updateCategoryById(id: number, category: CategoryDTO): Promise<Category> {

        const result = await prisma.category.update({
            data: {
                name: category.name,
                description: category.description
            },

            where: {
                id
            }
        })

        return result;
    }
}

export { CategoryRepositoryPrisma }