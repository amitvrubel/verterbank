import { Module } from '@nestjs/common';
import { EntriesModule } from './modules/entries/entries.module';

@Module({
  imports: [EntriesModule],
})
export class AppModule {}
