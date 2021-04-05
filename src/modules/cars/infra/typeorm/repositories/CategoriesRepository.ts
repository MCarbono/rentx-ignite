import Category from '../entities/Category';
import { ICategoriesRepository } from '../../../repositories/ICategoriesRepository';
import { getRepository, Repository } from 'typeorm';

interface CreateCategoryDTO {
    name: string;
    description: string;
}

class CategoriesRepository implements ICategoriesRepository{
    private repository: Repository<Category>

    constructor(){
        this.repository = getRepository(Category)
    }

    async create({ description, name } : CreateCategoryDTO): Promise<void>{
        const category = this.repository.create({
            name,
            description
        })
    
        await this.repository.save(category)
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({ name })
        return category;
    }
}

export default CategoriesRepository;