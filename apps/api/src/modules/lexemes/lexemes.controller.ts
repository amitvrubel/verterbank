import { Body, Controller, Param, Post } from '@nestjs/common';
import { LexemesService } from './lexemes.service';
import { CreateLexemeDto } from './dto/create-lexeme.dto';

@Controller('headwords/:headwordId/lexemes')
export class LexemesController {
  constructor(private readonly lexemesService: LexemesService) {}

  @Post()
  create(
    @Param('headwordId') headwordId: string,
    @Body() dto: CreateLexemeDto,
  ) {
    return this.lexemesService.create(headwordId, dto);
  }
}
