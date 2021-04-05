import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    })

    
    it("Should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            brand: "Car_brand",
            category_id: "category_id",
            daily_rate: 100,
            description: "Description car",
            fine_amount: 60,
            license_plate: "abc-1235",
            name: "Car1",
        })

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car_brand"
        });
        expect(cars).toEqual([car])
    })

    it("Should be able to lis all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            brand: "Car_brand_test",
            category_id: "category_id",
            daily_rate: 100,
            description: "Description car",
            fine_amount: 60,
            license_plate: "abc-1235",
            name: "Car2",
        })

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car_brand_test"
        });

        expect(cars).toEqual([car])
    })

    it("Should be able to lis all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            brand: "Car_brand_test",
            category_id: "category_id",
            daily_rate: 100,
            description: "Description car",
            fine_amount: 60,
            license_plate: "abc-1235",
            name: "Car3",
        })

        const cars = await listAvailableCarsUseCase.execute({
            name: "Car3"
        });

        expect(cars).toEqual([car])
    })

    it("Should be able to lis all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            brand: "Car_brand_test",
            category_id: "category_id",
            daily_rate: 100,
            description: "Description car",
            fine_amount: 60,
            license_plate: "abc-1235",
            name: "Car4",
        })

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "category_id"
        });

        expect(cars).toEqual([car])
    })
})