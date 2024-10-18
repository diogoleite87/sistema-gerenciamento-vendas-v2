import { CategoryRepositoryPrisma } from "../repositories/category.repository";
import { ItemDTO, ItemRepository } from "../interfaces/item.interface";
import { ItemRepositoryPrisma } from "../repositories/item.repository";
import { BadRequestError, NotFoundError } from "../helpers/api-error";
import { CategoryRepository } from "../interfaces/category.interface";
import { Item } from "@prisma/client";

class ItemUseCase {

    private itemRepository: ItemRepository;
    private categoryRepository: CategoryRepository;
    constructor() {
        this.itemRepository = new ItemRepositoryPrisma();
        this.categoryRepository = new CategoryRepositoryPrisma();
    }

    async create(body: ItemDTO): Promise<Item> {

        const categoryExists = await this.categoryRepository.findCategoryById(body.categoryId);

        if (!categoryExists) {
            throw new BadRequestError('Erro ao criar o item, categoria não existe.');
        }

        const result = await this.itemRepository.createItem(body);

        return result;
    }

    async findAll(categoryId: number | undefined): Promise<Item[] | []> {

        const result = await this.itemRepository.findAllItems(categoryId);

        return result;
    }

    async findById(id: number): Promise<Item> {

        const result = await this.itemRepository.findItemById(id);

        if (!result) {
            throw new NotFoundError('Item não existe.');
        }

        return result;
    }

    async updateById(id: number, body: ItemDTO): Promise<Item> {

        const itemExists = await this.itemRepository.findItemById(id);

        if (!itemExists) {
            throw new NotFoundError('Item não existe.');
        }

        if (body.categoryId) {
            const categoryExists = await this.categoryRepository.findCategoryById(body.categoryId);

            if (!categoryExists) {
                throw new BadRequestError('Erro ao atualizar o item, categoria não existe.');
            }
        }

        const result = await this.itemRepository.updateItemById(id, body);

        if (!result) {
            throw new BadRequestError('Erro ao atualizar o item');
        }

        return result;
    }

    async deleteById(id: number): Promise<string> {

        const itemExists = await this.itemRepository.findItemById(id);

        if (!itemExists) {
            throw new NotFoundError('Item não existe.');
        }

        const result = await this.itemRepository.deleteItemById(id);

        if (!result) {
            throw new BadRequestError('Erro ao deletar item.')
        }

        return "Item deletado com sucesso."
    }

}

export { ItemUseCase }