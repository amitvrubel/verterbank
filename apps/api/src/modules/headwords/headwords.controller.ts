import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { HeadwordsService } from './headwords.service';
import { CreateHeadwordDto } from './dto/create-headword.dto';
import { UpdateLexemeDto } from '../lexemes/dto/update-lexeme.dto';
import { UpdateHeadwordDto } from './dto/update-headword.dto';

@Controller('headwords')
export class HeadwordsController {
  constructor(private readonly headwords: HeadwordsService) {}

  @Post()
  create(@Body() body: CreateHeadwordDto) {
    return this.headwords.createHeadword(body.orth);
  }

  @Get('search')
  search(@Query('q') q: string) {
    return this.headwords.search(q ?? '');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.headwords.findById(id);
  }

  @Patch(':headwordId')
  update(
    @Param('headwordId') headwordId: string,
    @Body() dto: UpdateHeadwordDto,
  ) {
    return this.headwords.update(headwordId, dto);
  }
}
