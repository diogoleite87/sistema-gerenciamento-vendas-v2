import { CategoryDTO, CategoryRepository } from "../interfaces/category.interface";
import { CategoryRepositoryPrisma } from "../repositories/category.repository";
import { BadRequestError, NotFoundError } from "../helpers/api-error";
import { Category } from "@prisma/client";

class CategoryUseCase {

    private categoryRepository: CategoryRepository;
    constructor() {
        this.categoryRepository = new CategoryRepositoryPrisma();
    }

    async create(body: CategoryDTO): Promise<Category> {

        const categoryExistis = await this.categoryRepository.findCategoryByName(body.name);

        if (categoryExistis) {
            throw new BadRequestError('Categoria com nome ja existente.');
        }

        const category = await this.categoryRepository.createCategory(body);

        return category;

    }

    async findAll(): Promise<Category[] | []> {

        const result = await this.categoryRepository.findAllCategories();

        return result;
    }

    async findById(id: number): Promise<Category | null> {

        const result = await this.categoryRepository.findCategoryById(id);

        if (!result) {
            throw new NotFoundError('Categoria não existe.')
        }

        return result || null;
    }

    async updateById(id: number, body: CategoryDTO): Promise<Category> {

        const categoryExists = await this.categoryRepository.findCategoryById(id);

        if (!categoryExists) {
            throw new NotFoundError('Categoria não existe.');
        }

        const categoryNameExists = await this.categoryRepository.findCategoryByName(body.name);

        if (categoryNameExists) {
            throw new BadRequestError('Nome de categoria já existente');
        }

        const category = this.categoryRepository.updateCategoryById(id, body);

        return category;
    }

    async deleteById(id: number): Promise<string> {

        const categoryExists = await this.categoryRepository.findCategoryById(id);

        if (!categoryExists) {
            throw new NotFoundError('Categoria não existe.');
        }

        const result = await this.categoryRepository.deleteCategoryById(id);

        if (!result) {
            throw new BadRequestError('Erro ao deletar categoria.')
        }

        return "Categoria deletada com sucesso."

    }
}

export { CategoryUseCase }