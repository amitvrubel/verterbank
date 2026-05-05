import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { SensesService } from '../senses/senses.service';
import { ExamplesService } from './examples.service';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';

@Controller('senses/:senseId/examples')
export class ExamplesController {
  constructor(private readonly exampleService: ExamplesService) {}
  @Post()
  create(@Param('senseId') senseId: string, @Body() dto: CreateExampleDto) {
    return this.exampleService.create(senseId, dto);
  }

  @Patch(':exampleId')
  update(@Param('exampleId') exampleId: string, @Body() dto: UpdateExampleDto) {
    return this.exampleService.update(exampleId, dto);
  }

  @Delete(':exampleId')
  delete(@Param('exampleId') exampleId: string) {
    return this.exampleService.delete(exampleId);
  }
}
