import { Module } from '@nestjs/common';
import { HeadwordsService } from './headwords.service';
import { HeadwordsController } from './headwords.controller';

@Module({
  providers: [HeadwordsService],
  controllers: [HeadwordsController]
})
export class HeadwordsModule {}
