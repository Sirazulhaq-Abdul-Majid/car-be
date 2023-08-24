import { Injectable } from '@nestjs/common';
import { AddCarDTO } from './dto/add-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cars } from './database/cars.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarsService {
  constructor(@InjectRepository(Cars) private carsRepo: Repository<Cars>) { }
  async saveCar(carDto: AddCarDTO) {
    const car = this.carsRepo.create({
      description: carDto.description,
      condition: carDto.condition,
      brands: carDto.brands,
      model: carDto.model,
      transmission: carDto.transmission,
      image: carDto.image,
      year: carDto.year,
      engine_cc: carDto.engine_cc,
      horse_power: carDto.horse_power,
      torque: carDto.torque
    })
    try {
      this.carsRepo.save(car)
    } catch (error) {
      console.log(error)
    }
  }
}
