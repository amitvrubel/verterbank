import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { SensesService } from './senses.service';
import { CreateSenseDto } from './dto/create-sense.dto';

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
}
