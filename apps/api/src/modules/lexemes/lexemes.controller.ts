import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LexemesService } from './lexemes.service';
import { CreateLexemeDto } from './dto/create-lexeme.dto';
import { UpdateLexemeDto } from './dto/update-lexeme.dto';
import { CreateRelationDto } from './dto/create-relation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ActiveUserGuard } from '../auth/guards/active-user.guard';

@Controller('headwords/:headwordId/lexemes')
export class LexemesController {
  constructor(private readonly lexemesService: LexemesService) {}

  @UseGuards(JwtAuthGuard, ActiveUserGuard)
  @Get(':lexemeId')
  get(@Param('lexemeId') lexemeId: string) {
    return this.lexemesService.getLexeme(lexemeId);
  }
  @UseGuards(JwtAuthGuard, ActiveUserGuard)
  @Post()
  create(
    @Param('headwordId') headwordId: string,
    @Body() dto: CreateLexemeDto,
  ) {
    return this.lexemesService.create(headwordId, dto);
  }

  @UseGuards(JwtAuthGuard, ActiveUserGuard)
  @Patch(':lexemeId')
  update(@Param('lexemeId') lexemeId: string, @Body() dto: UpdateLexemeDto) {
    return this.lexemesService.update(lexemeId, dto);
  }

  @UseGuards(JwtAuthGuard, ActiveUserGuard)
  @Delete(':lexemeId')
  delete(@Param('lexemeId') lexemeId: string) {
    return this.lexemesService.delete(lexemeId);
  }

  @Get(':lexemeId/relations')
  getRelations(@Param('lexemeId') lexemeId: string) {
    return this.lexemesService.getRelations(lexemeId);
  }

  @UseGuards(JwtAuthGuard, ActiveUserGuard)
  @Post(':lexemeId/relations')
  createRelation(@Param('lexemeId') lexemeId: string, dto: CreateRelationDto) {
    return this.lexemesService.createRelation(
      lexemeId,
      dto.toLexemeId,
      dto.type,
    );
  }

  @UseGuards(JwtAuthGuard, ActiveUserGuard)
  @Delete(':lexemeId/relations/:toLexemeId')
  deleteRelation(
    @Param('lexemeId') lexemeId: string,
    @Param('toLexemeId') toLexemeId: string,
  ) {
    return this.lexemesService.deleteRelation(lexemeId, toLexemeId);
  }
}
