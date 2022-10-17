import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dto';

@Controller('cars')
// @UsePipes(ValidationPipe)
export class CarsController {

	constructor(
		private readonly carsService: CarsService
	) { }

	@Get()
	getAllCars() {
		return this.carsService.findAll();
	}

	@Get(':id')
	getCarById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
		return this.carsService.findById(id);
	}

	@Post()
	createCar(@Body() body: CreateCarDto) {
		return this.carsService.create(body);
	}

	@Patch(':id')
	updateCar(
		@Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
		@Body() body: UpdateCarDto
	) {
		return this.carsService.update(id, body);
	}

	@Delete(':id')
	deleteCar(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
		return this.carsService.delete(id);
	}
}
