import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import {SpecificationRepositoryInMemory} from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory

describe("Create Car Specification", () => {
    beforeEach(() => {
        specificationsRepositoryInMemory = new SpecificationRepositoryInMemory()
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
    })

    it("Should not be able to add a new specification to a non-existent car", async () => {
       expect(async () => {
            const car_id = "1234";
            const specifications_id = ["54321"]

            await createCarSpecificationUseCase.execute({car_id, specifications_id});
       }).rejects.toBeInstanceOf(AppError)
    })
    
    it("Should be able to add a new specification to the car", async () => {
        const car = await carsRepositoryInMemory.create({
            brand: "Ford",
            category_id: "category",
            daily_rate: 100,
            description: "Description car",
            fine_amount: 60,
            license_plate: "abc-1235",
            name: "Car Available",
        })

        const specification = await specificationsRepositoryInMemory.create({
            description: "teste",
            name: "test"
        })
       
        const specifications_id = [specification.id]
        const specificationsCars = await createCarSpecificationUseCase.execute({car_id: car.id, specifications_id});

        expect(specificationsCars).toHaveProperty("specifications")
        expect(specificationsCars.specifications.length).toBe(1)
    })
})