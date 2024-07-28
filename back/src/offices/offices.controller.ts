import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { OfficeService } from 'src/offices/offices.service';
import { CreateOfficesDto, UpdateOfficeDto } from './offices.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('offices')
export class OfficeController {
  constructor(private readonly officeService: OfficeService) {}

  @Get()
  getAllOffices(@Query('page') page: number, @Query('limit') limit: number) {
    return this.officeService.getAllOffices(Number(page), Number(limit));
  }

  @Get('seeder')
  addOffices() {
    return this.officeService.addOffices();
  }

  @Get(':id')
  getOfficeById(@Param('id') id: string) {
    return this.officeService.getOfficeById(id);
  }

  @Post()
  createOffice(@Body() office: CreateOfficesDto){
    return this.officeService.addNewOffice(office);
  }

  @Put(':id')
  updateOffices(@Param('id') id: string, @Body() office: UpdateOfficeDto){
    return this.officeService.updateOffice(office, id);
  }
}
