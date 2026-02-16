import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import { HeadwordsService } from './headwords.service';

@Controller('headwords')
export class HeadwordsController {
  constructor(private readonly headwords: HeadwordsService) {}

  @Post()
  create(@Body() body: { orth: string }) {
    return this.headwords.createHeadword(body.orth);
  }

  @Get('search')
  search(@Query('q') q: string) {
    return this.headwords.search(q);
  }
}
