import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { SensesService } from './senses.service';
import { CreateSenseDto } from './dto/create-sense.dto';
import { UpdateSenseDto } from './dto/update-sense.dto';

@Controller('lexemes/:lexemeId/senses')
export class SensesController {
  constructor(private readonly sensesService: SensesService) {}

  @Post()
  create(@Param('lexemeId') lexemeId: string, @Body() dto: CreateSenseDto) {
    return this.sensesService.create(lexemeId, dto);
  }

  @Delete(':senseId')
  delete(@Param('senseId') senseId: string) {
    return this.sensesService.delete(senseId);
  }

  @Patch(':senseId')
  update(@Param('senseId') senseId: string, @Body() dto: UpdateSenseDto) {
    return this.sensesService.update(senseId, dto);
  }

  @Delete(':senseId')
  remove(@Param('senseId') senseId: string) {
    return this.sensesService.remove(senseId);
  }
}
