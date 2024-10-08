import { Module } from "@nestjs/common";
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cars } from "./database/cars.entity";
import { UsersModule } from "src/users/users.module";
import { Images } from "./database/images.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Cars, Images]), UsersModule],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService]
})
export class CarsModule { }

