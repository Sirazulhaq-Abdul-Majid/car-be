import { Module } from "@nestjs/common";
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cars } from "./database/cars.entity";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([Cars]), UsersModule],
  controllers: [CarsController],
  providers: [CarsService]
})
export class CarsModule { }

