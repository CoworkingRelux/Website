import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { OfficeService } from 'src/offices/offices.service';
import { CreateOfficesDto } from './offices.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('offices')
@Controller('offices')
export class OfficeController {
  constructor(private readonly officeService: OfficeService) {}

  @Get()
  @ApiOperation({ summary: 'Get all offices with pagination' })
  getAllOffices(@Query('page') page: number, @Query('limit') limit: number) {
    return this.officeService.getAllOffices(Number(page), Number(limit));
  }

  @Get('seeder')
  @ApiOperation({ summary: 'Add seed offices' })
  addOffices() {
    return this.officeService.addOffices();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get office by ID' })
  getOfficeById(@Param('id') id: string) {
    return this.officeService.getOfficeById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new office' })
  createOffice(@Body() office: CreateOfficesDto) {
    return this.officeService.addNewOffice(office);
  }
}

