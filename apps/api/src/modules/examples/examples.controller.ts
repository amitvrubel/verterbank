import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { SensesService } from '../senses/senses.service';
import { ExamplesService } from './examples.service';
import { CreateExampleDto } from './dto/create-example.dto';

@Controller('senses/:senseId/examples')
export class ExamplesController {
  constructor(private readonly exampleService: ExamplesService) {}
  @Post()
  create(@Param('senseId') senseId: string, @Body() dto: CreateExampleDto) {
    return this.exampleService.create(senseId, dto);
  }

  @Delete(':exampleId')
  delete(@Param('exampleId') exampleId: string) {
    return this.exampleService.delete(exampleId);
    1;
  }
}
