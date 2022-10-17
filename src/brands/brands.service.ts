import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 } from 'uuid';
import { Car } from 'src/cars/interfaces/car.interface';
import { BrandsModule } from './brands.module';

@Injectable()
export class BrandsService {

  private brands: Brand[] = [
    // {
    //   id: v4(),
    //   name: 'Toyota',
    //   createdAt: new Date().getTime()
    // }
  ];

  create(createBrandDto: CreateBrandDto) {
    const { name } = createBrandDto;

    const brand: Brand = {
      id: v4(),
      name: name.toLocaleLowerCase(),
      createdAt: new Date().getTime(),
    }

    this.brands.push(brand);

    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) {
      throw new NotFoundException(`Brand with id "${id}" not found`);
    }
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brand = this.findOne(id);
    this.brands = this.brands.map((item) => {
      if (item.id === id) {
        brand.updatedAt = new Date().getTime();
        brand = {
          ...brand,
          ...updateBrandDto
        }
        return brand;
      }
      return item;
    });
    return brand;
  }

  remove(id: string) {
    const brand = this.findOne(id);
    const index = this.brands.indexOf(brand);
    this.brands.splice(index, 1);
    return {
        "message": "Brand delete"
    };
  }

  fillBrandsWithSeedData(brands: Brand[]) {
    this.brands = brands;
  }
}
