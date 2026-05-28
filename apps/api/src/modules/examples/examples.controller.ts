import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SensesService } from '../senses/senses.service';
import { ExamplesService } from './examples.service';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ActiveUserGuard } from '../auth/guards/active-user.guard';

@Controller('senses/:senseId/examples')
export class ExamplesController {
  constructor(private readonly exampleService: ExamplesService) {}
  @UseGuards(JwtAuthGuard, ActiveUserGuard)
  @Post()
  create(@Param('senseId') senseId: string, @Body() dto: CreateExampleDto) {
    return this.exampleService.create(senseId, dto);
  }

  @UseGuards(JwtAuthGuard, ActiveUserGuard)
  @Patch(':exampleId')
  update(@Param('exampleId') exampleId: string, @Body() dto: UpdateExampleDto) {
    return this.exampleService.update(exampleId, dto);
  }

  @UseGuards(JwtAuthGuard, ActiveUserGuard)
  @Delete(':exampleId')
  delete(@Param('exampleId') exampleId: string) {
    return this.exampleService.delete(exampleId);
  }
}
