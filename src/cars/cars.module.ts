import { Module } from "@nestjs/common";
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cars } from "./database/cars.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Cars])],
  controllers: [CarsController],
  providers: [CarsService]
})
export class CarsModule { }

