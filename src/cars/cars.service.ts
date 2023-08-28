import { Injectable } from '@nestjs/common';
import { AddCarDTO } from './dto/add-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cars } from './database/cars.entity';
import { QueryBuilder, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { SearchCarDTO } from './dto';

@Injectable()
export class CarsService {
  constructor(@InjectRepository(Cars) private carsRepo: Repository<Cars>, private userService: UsersService) { }

  async saveCar(carDto: AddCarDTO, payload: any, paths: any) {
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

  async searchCar(carDto: SearchCarDTO) {
    const queryBuilder = this.carsRepo.createQueryBuilder("cars")
    const query = this.generateQuery(queryBuilder, carDto)
    return await query.getMany()
  }

  //worker functions
  generateQuery(query: any, carDto: SearchCarDTO) {
    if (carDto.brands) {
      query.where("cars.brands LIKE :brand", { brand: carDto.brands })
    }
    if (carDto.model) {
      query.andWhere("cars.model LIKE :model", { model: `%${carDto.model}%` })
    }
    if (carDto.transmission) {
      query.andWhere("cars.transmission LIKE :transmission", { transmission: carDto.transmission })
    }
    if (carDto.condition) {
      query.andWhere("cars.condition LIKE :condition", { condition: carDto.condition })
    }
    if (carDto.year_start) {
      query.andWhere("cars.year >= :startDate", { startDate: carDto.year_start })
    }
    if (carDto.year_end) {
      query.andWhere("cars.year <= :endDate", { endDate: carDto.year_end })
    }
    if (carDto.engine_cc_start) {
      query.andWhere("cars.engine_cc >= :startCC", { startCC: carDto.engine_cc_start })
    }
    if (carDto.engine_cc_end) {
      query.andWhere("cars.engine_cc >= :endCC", { endCC: carDto.engine_cc_end })
    }
    if (carDto.horse_power_start) {
      query.andWhere("cars.horse_power >= :startHP", { startHP: carDto.horse_power_start })
    }
    if (carDto.horse_power_end) {
      query.andWhere("cars.horse_power >= :endHP", { endHP: carDto.horse_power_end })
    }
    if (carDto.torque_start) {
      query.andWhere("cars.torque >= :startTorque", { startTorque: carDto.torque_start })
    }
    if (carDto.torque_end) {
      query.andWhere("cars.torque >= :endTorque", { endTorque: carDto.torque_end })
    }
    return query
  }
}
