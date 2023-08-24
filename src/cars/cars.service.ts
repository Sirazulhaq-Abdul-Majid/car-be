import { Injectable } from '@nestjs/common';
import { AddCarDTO } from './dto/add-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cars } from './database/cars.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CarsService {
  constructor(@InjectRepository(Cars) private carsRepo: Repository<Cars>, private userService: UsersService) { }
  async saveCar(carDto: AddCarDTO, payload: any) {
    try {
      const user = await this.userService.findOne(payload.username)
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
        torque: carDto.torque,
        users: user
      })
      this.carsRepo.save(car)
    } catch (error) {
      console.log(error)
    }
  }
}
