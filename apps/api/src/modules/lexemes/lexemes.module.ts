import { Module } from '@nestjs/common';
import { LexemesService } from './lexemes.service';
import { LexemesController } from './lexemes.controller';

@Module({
  providers: [LexemesService],
  controllers: [LexemesController],
})
export class LexemesModule {}
