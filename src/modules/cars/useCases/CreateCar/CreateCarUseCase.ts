import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";

@injectable()
class CreateCarUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ){}
    async execute({
        brand, 
        category_id, 
        daily_rate, 
        description, 
        fine_amount, 
        license_plate, 
        name,
    }: ICreateCarDTO): Promise<Car>{

        const carAlreadyExists = await this.carsRepository.findByLicensePlate(license_plate);

        if(carAlreadyExists){
            throw new AppError('Car already exists!');
        }

        const car = await this.carsRepository.create({
            brand, 
            category_id, 
            daily_rate, 
            description, 
            fine_amount, 
            license_plate, 
            name,
        })

        return car;
    }
}

export { CreateCarUseCase }