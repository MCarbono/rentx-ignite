
import Category from "@modules/cars/infra/typeorm/entities/Category";
import { CreateCategoryDTO, ICategoriesRepository } from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository  {

    categories: Category[] = [];

    async findByName(name: string): Promise<Category> {
        return await this.categories.find(category => category.name === name)
    
    }
    async list(): Promise<Category[]> {
        const all = this.categories;
        return all;
    }

    async create({ name, description }: CreateCategoryDTO): Promise<void> {
        const category = new Category()

        Object.assign(category, {
            name,
            description
        })
        this.categories.push(category)
    }
}

export { CategoriesRepositoryInMemory }

