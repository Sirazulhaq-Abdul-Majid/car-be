import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { AddCarDTO } from "./dto/add-car.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Cars } from "./database/cars.entity";
import { Repository } from "typeorm";
import { UsersService } from "src/users/users.service";
import { SearchCarDTO } from "./dto";
import { Images } from "./database/images.entity";
import { EditCarDto } from "./dto/edit-car.dto";

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Cars) private carsRepo: Repository<Cars>,
    private userService: UsersService,
    @InjectRepository(Images) private imageRepo: Repository<Images>
  ) { }

  async saveCar(
    carDto: AddCarDTO,
    payload: any,
    files: Array<Express.Multer.File>
  ) {
    try {
      const user = await this.userService.findOne(payload.username);
      const car = this.carsRepo.create({
        description: carDto.description,
        condition: carDto.condition,
        brands: carDto.brands,
        model: carDto.model,
        transmission: carDto.transmission,
        year: carDto.year,
        engine_cc: Number(carDto.engine_cc),
        horse_power: carDto.horse_power,
        price: carDto.price,
        milage: carDto.milage,
        torque: carDto.torque,
        users: user,
        rating: Number(carDto.rating),
      });
      const savedCar = await this.carsRepo.save(car);
      files.forEach(async (file) => {
        const image = this.imageRepo.create({
          image: file.buffer,
          cars: savedCar,
        });
        await this.imageRepo.save(image);
      });
      return {
        statusCode: 201,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async editCar(
    carDto: EditCarDto,
    payload: any,
    id: number,
    files: Array<Express.Multer.File>
  ) {
    try {
      const car = await this.carsRepo.findOne({
        where: { id },
        relations: ["users"],
      });
      const user = await this.userService.findOne(payload.username);
      if (car.users.id !== user.id) {
        throw new UnauthorizedException();
      }
      for (const key of Object.keys(carDto)) {
        if (key !== "images") {
          car[key] = carDto[key];
        }
      }
      const newCar = await this.carsRepo.update(car.id, car);
      const images = await this.imageRepo.find({
        where: { cars: { id: car.id } },
      });
      images.forEach((image) => {
        this.imageRepo.delete(image.id);
      });
      files.forEach(async (file) => {
        const image = this.imageRepo.create({
          image: file.buffer,
          cars: car,
        });
        const img = await this.imageRepo.save(image);
      });
      if (newCar) {
        return {
          statusCode: 200,
        };
      } else {
        return {
          statusCode: 400,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async searchCar(carDto: SearchCarDTO) {
    const queryBuilder = this.carsRepo
      .createQueryBuilder("cars")
      .leftJoinAndSelect("cars.images", "images")
      .select(["cars", "images.image"]);
    const query = this.generateQuery(queryBuilder, carDto);
    try {
      const cars = await query.getMany();
      return cars;
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async sendOne(id: number) {
    try {
      const car = await this.carsRepo.findOne({
        where: { id },
        relations: ["images", "users"],
      });
      delete car.users.password_hash;
      var base64Images = [];
      car.images.forEach((image) => {
        const base64Image = image.image.toString("base64");
        base64Images.push(base64Image);
      });
      delete car.images;
      return { car, images: base64Images };
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async getAll() {
    try {
      const query = this.carsRepo
        .createQueryBuilder("cars")
        .leftJoinAndSelect("cars.images", "images")
        .select(["cars", "images.image"]);
      const cars = await query
        .orderBy("cars.rating", "DESC")
        .take(20)
        .getMany();
      var carsImage = [];
      cars.forEach((car) => {
        var base64Images = [];
        car.images.forEach((image) => {
          const base64Image = image.image.toString("base64");
          base64Images.push(base64Image);
        });
        delete car.images;
        carsImage.push({
          car,
          images: base64Images,
        });
      });
      return carsImage;
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async addReview(id: number, payload: any) {
    try {
      const car = await this.carsRepo.findOne({
        where: { id },
        relations: ["reviewers"],
      });
      const user = await this.userService.findOneReview(payload.id);
      if (!car) {
        throw new NotFoundException(`Car with id:${id} not found`);
      }
      if (!user) {
        throw new UnauthorizedException();
      }
      var exists = false;
      var i = 0;
      var index = 0;
      user.review.forEach((r) => {
        if (r.id === car.id) {
          exists = true;
          index = i;
        }
        i++;
      });
      if (!exists) {
        //add car to like list
        user.review.push(car);
        await this.userService.save(user);
      } else {
        //remove car from like list
        user.review.splice(index, index);
        await this.userService.save(user);
      }
      return {
        statusCode: 201,
        reviewNumber: this.lengthOf(user.review),
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async idCarsLiked(payload: any) {
    console.log(payload)
    const user = await this.userService.findOneReview(payload.id)
    return user
  }
  //worker functions
  async findOne(id: number) {
    try {
      const car = await this.carsRepo.findOne({
        where: { id },
        relations: ["users"],
      });
      if (!car) {
        throw new BadRequestException();
      }
      delete car.users.password_hash;
      return car;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  generateQuery(query: any, carDto: SearchCarDTO) {
    if (carDto.brands) {
      query.where("cars.brands LIKE :brand", { brand: carDto.brands });
    }
    if (carDto.type) {
      query.where("cars.type LIKE :type", { type: carDto.type });
    }
    if (carDto.model) {
      query.andWhere("cars.model LIKE :model", { model: `%${carDto.model}%` });
    }
    if (carDto.transmission) {
      query.andWhere("cars.transmission LIKE :transmission", {
        transmission: carDto.transmission,
      });
    }
    if (carDto.condition) {
      query.andWhere("cars.condition LIKE :condition", {
        condition: carDto.condition,
      });
    }
    if (carDto.year_start) {
      query.andWhere("cars.year >= :startDate", {
        startDate: carDto.year_start,
      });
    }
    if (carDto.year_end) {
      query.andWhere("cars.year <= :endDate", { endDate: carDto.year_end });
    }
    if (carDto.engine_cc_start) {
      query.andWhere("cars.engine_cc >= :startCC", {
        startCC: carDto.engine_cc_start,
      });
    }
    if (carDto.engine_cc_end) {
      query.andWhere("cars.engine_cc <= :endCC", {
        endCC: carDto.engine_cc_end,
      });
    }
    if (carDto.price_start) {
      query.andWhere("cars.price>= :startPrice", {
        startPrice: carDto.price_start,
      });
    }
    if (carDto.price_end) {
      query.andWhere("cars.price <= :endPrice", {
        endPrice: carDto.price_end,
      });
    }
    if (carDto.horse_power_start) {
      query.andWhere("cars.horse_power >= :startHP", {
        startHP: carDto.horse_power_start,
      });
    }
    if (carDto.horse_power_end) {
      query.andWhere("cars.horse_power <= :endHP", {
        endHP: carDto.horse_power_end,
      });
    }
    if (carDto.torque_start) {
      query.andWhere("cars.torque >= :startTorque", {
        startTorque: carDto.torque_start,
      });
    }
    if (carDto.torque_end) {
      query.andWhere("cars.torque <= :endTorque", {
        endTorque: carDto.torque_end,
      });
    }
    return query;
  }

  lengthOf(payload: any) {
    var i = 0;
    var length = 0;
    while (payload[i]) {
      length++;
      i++;
    }
    return length;
  }
}
