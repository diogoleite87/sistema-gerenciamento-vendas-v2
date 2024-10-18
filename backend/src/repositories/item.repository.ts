import { ItemDTO, ItemRepository } from "../interfaces/item.interface";
import { prisma } from "../database/prisma-client";
import { Item } from "@prisma/client";

class ItemRepositoryPrisma implements ItemRepository {

    async createItem(item: ItemDTO): Promise<Item> {

        const result = await prisma.item.create({
            data: {
                name: item.name,
                image: item.image,
                stock: item.stock,
                description: item.description,
                value: item.value,
                categoryId: item.categoryId,
                deleted: false
            }
        });

        return result || null;
    }

    async deleteItemById(id: number): Promise<Item | null> {

        const result = await prisma.item.update({
            where: {
                id
            },
            data: {
                deleted: true
            }
        });

        return result || null;
    }

    async findAllItems(categoryId?: number): Promise<[] | Item[]> {

        const result = await prisma.item.findMany({
            where: {
                deleted: false,
                categoryId: categoryId ? categoryId : undefined
            },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                        description: true
                    }
                }
            }
        });

        return result;
    }

    async findItemById(id: number): Promise<Item | null> {

        const result = await prisma.item.findUnique({
            where: {
                id,
                deleted: false
            },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                        description: true
                    }
                }
            }
        });

        return result || null;
    }

    async updateItemById(id: number, item: ItemDTO): Promise<Item | null> {

        const result = await prisma.item.update({
            where: {
                id
            },
            data: {
                name: item.name,
                image: item.image,
                stock: item.stock,
                description: item.description,
                value: item.value
            }
        })

        return result || null;
    }
}

export { ItemRepositoryPrisma }