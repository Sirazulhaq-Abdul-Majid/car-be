import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AddCarDTO } from './dto/add-car.dto';
import { AccessTokenGuard } from 'src/auth/guard/access-token.guard';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) { }

  @UseGuards(AccessTokenGuard)
  @Post('save')
  async addCar(@Body() carDto: AddCarDTO, @Request() req: any) {
    return this.carsService.saveCar(carDto, req.user)
  }

}
