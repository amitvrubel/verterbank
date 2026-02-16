import { Module } from '@nestjs/common';
import { HeadwordsModule } from './modules/headwords/headwords.module';

@Module({
  imports: [HeadwordsModule],
})
export class AppModule {}
