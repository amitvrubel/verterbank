import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { HeadwordsService } from './headwords.service';
import { CreateHeadwordDto } from './dto/create-headword.dto';

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
}
