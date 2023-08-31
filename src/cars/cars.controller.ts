import { Body, Controller, Get, Param, Post, Request, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { CarsService } from './cars.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AccessTokenGuard } from 'src/auth/guard/access-token.guard';
import { multerConfig } from 'src/base/multer/multer.config';
import { AddCarDTO, SearchCarDTO } from './dto';



@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) { }

  @UseGuards(AccessTokenGuard)
  @Post('save')
  @UseInterceptors(FilesInterceptor('image', 20, multerConfig))
  async addCar(@Body() carDto: AddCarDTO, @Request() req: any, @UploadedFiles() files: Array<Express.Multer.File>) {
    return this.carsService.saveCar(carDto, req.user, files)
  }

  @Post('search')
  async search(@Body() carDto: SearchCarDTO) {
    return this.carsService.searchCar(carDto)
  }

  @Get(':id')
  async oneCar(@Param('id') id: number) {
    return this.carsService.sendOne(id)
  }

}
