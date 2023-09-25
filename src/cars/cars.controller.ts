import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { CarsService } from "./cars.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { AccessTokenGuard } from "src/auth/guard/access-token.guard";
import { multerConfig } from "src/base/multer/multer.config";
import { AddCarDTO, SearchCarDTO } from "./dto";
import { EditCarDto } from "./dto/edit-car.dto";

@Controller("cars")
export class CarsController {
  constructor(private carsService: CarsService) {}

  @UseGuards(AccessTokenGuard)
  @Post("save")
  @UseInterceptors(FilesInterceptor("image", 20, multerConfig))
  async addCar(
    @Body() carDto: AddCarDTO,
    @Request() req: any,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    return await this.carsService.saveCar(carDto, req.user, files);
  }

  @Post("search")
  async search(@Body() carDto: SearchCarDTO) {
    return this.carsService.searchCar(carDto);
  }

  @UseGuards(AccessTokenGuard)
  @Post("edit/:id")
  @UseInterceptors(FilesInterceptor("image", 20, multerConfig))
  async edit(
    @Body() carDto: EditCarDto,
    @Request() req: any,
    @Param("id") id: number,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    return this.carsService.editCar(carDto, req.user, id, files);
  }

  @Get()
  async getAllCars() {
    return this.carsService.getAll();
  }

  @Get(":id")
  async oneCar(@Param("id") id: number) {
    return this.carsService.sendOne(id);
  }

  @UseGuards(AccessTokenGuard)
  @Get("/rating/:id")
  async addReview(@Param("id") id: number, @Request() req: any) {
    return await this.carsService.addReview(id, req.user);
  }
}
