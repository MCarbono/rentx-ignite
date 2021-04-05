import Specification from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationsRepository";


class SpecificationRepositoryInMemory implements ISpecificationRepository{
    private specifications: Specification[] = [];

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification()
        Object.assign(specification, {
            description,
            name
        })
        this.specifications.push(specification)

        return specification;
    }

    async findByName(name: string): Promise<Specification> {
        return this.specifications.find(specification => specification.name === name)
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifictions = this.specifications.filter(specification => ids.includes(specification.id))
        return allSpecifictions;
    }
    
}

export { SpecificationRepositoryInMemory }