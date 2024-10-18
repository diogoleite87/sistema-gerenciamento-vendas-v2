import { Item } from "@prisma/client";

export interface ItemDTO {
    name: string;
    description: string;
    categoryId: number;
    value: number;
    stock: number;
    image: string;
}

export interface ItemRepository {
    findItemById(id: number): Promise<Item | null>
    deleteItemById(id: number): Promise<Item | null>
    findAllItems(categoryId?: number): Promise<Item[] | []>
    updateItemById(id: number, item: ItemDTO): Promise<Item | null>
    createItem(item: ItemDTO): Promise<Item>
}