import { Injectable } from '@nestjs/common';
import { AddCarDTO } from './dto/add-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cars } from './database/cars.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import Jimp from 'jimp';

@Injectable()
export class CarsService {
  constructor(@InjectRepository(Cars) private carsRepo: Repository<Cars>, private userService: UsersService) { }
  async saveCar(carDto: AddCarDTO, payload: any, paths) {
    try {
      const user = await this.userService.findOne(payload.username)
      const imagePath = JSON.stringify(paths)
      const car = this.carsRepo.create({
        description: carDto.description,
        condition: carDto.condition,
        brands: carDto.brands,
        model: carDto.model,
        transmission: carDto.transmission,
        year: carDto.year,
        engine_cc: carDto.engine_cc,
        horse_power: carDto.horse_power,
        torque: carDto.torque,
        users: user,
        image: imagePath
      })
      this.carsRepo.save(car)
      return {
        statusCode: 201
      }
    } catch (error) {
      console.log(error)
      return {
        statusCode: 400
      }
    }
  }

  //worker functions
}
