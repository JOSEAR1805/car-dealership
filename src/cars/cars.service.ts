import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {

    private cars: Car[] = [
        // {
        //     id: uuid(),
        //     brand: 'Toyota',
        //     model: 'Corolla'
        // }
    ];

    findAll() {
        return this.cars;
    }

    findById(id: string) {
        const car = this.cars.find((car) => car.id === id);
        if (!car) {
            throw new NotFoundException(`Car with id '${id}' not found`);
        }
        return car;
    }

    create(data: CreateCarDto) {
        const car: Car = {
            id: uuid(),
            ...data
        }
        this.cars.push(car);
        return car
    }

    update(id: string, data: UpdateCarDto) {
        let carDB = this.findById(id);
        if (data.id && data.id !== id) {
            throw new BadRequestException(`Car id is not valid inside body`);
        }

        this.cars = this.cars.map(item => {
            if (item.id === id) {
                carDB = {
                    ...carDB, 
                    ...data,
                    id
                }
                return carDB;
            }
            return item;
        })
        return carDB; 
    }

    delete(id: string) {
        const car = this.findById(id);
        const index = this.cars.indexOf(car);
        this.cars.splice(index, 1);
        return {
            "message": "Carro eliminado"
        };
    }

    fillCarsWithSeedData(cars: Car[]) {
        this.cars = cars;
    }

}
