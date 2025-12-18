import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AttendantService } from './attendant.service';
import { CreateAttendantDto } from './dto/create-attendant.dto';
import { UpdateAttendantDto } from './dto/update-attendant.dto';

@Controller('attendant')
export class AttendantController {
  constructor(private readonly attendantService: AttendantService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createAttendantDto: CreateAttendantDto) {
    return this.attendantService.create(createAttendantDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.attendantService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.attendantService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateAttendantDto: UpdateAttendantDto) {
    return this.attendantService.update(+id, updateAttendantDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.attendantService.remove(+id);
  }
}
