import { Module } from '@nestjs/common';
import { EntriesModule } from './modules/entries/entries.module';
import { HeadwordsModule } from './modules/headwords/headwords.module';

@Module({
  imports: [EntriesModule, HeadwordsModule],
})
export class AppModule {}
