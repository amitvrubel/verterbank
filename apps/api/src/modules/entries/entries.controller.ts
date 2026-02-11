import {Controller, Get} from '@nestjs/common';

@Controller('entries')
export class EntriesController {
  @Get()
  findAll() {
    return {message: 'Entries endpoint works'};
  }
}
