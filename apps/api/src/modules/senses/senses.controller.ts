import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SensesService } from './senses.service';
import { CreateSenseDto } from './dto/create-sense.dto';
import { UpdateSenseDto } from './dto/update-sense.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ActiveUserGuard } from '../auth/guards/active-user.guard';

@Controller('lexemes/:lexemeId/senses')
export class SensesController {
  constructor(private readonly sensesService: SensesService) {}

  @UseGuards(JwtAuthGuard, ActiveUserGuard)
  @Post()
  create(@Param('lexemeId') lexemeId: string, @Body() dto: CreateSenseDto) {
    return this.sensesService.create(lexemeId, dto);
  }

  @UseGuards(JwtAuthGuard, ActiveUserGuard)
  @Patch(':senseId')
  update(@Param('senseId') senseId: string, @Body() dto: UpdateSenseDto) {
    return this.sensesService.update(senseId, dto);
  }

  @UseGuards(JwtAuthGuard, ActiveUserGuard)
  @Delete(':senseId')
  remove(@Param('senseId') senseId: string) {
    return this.sensesService.remove(senseId);
  }
}
