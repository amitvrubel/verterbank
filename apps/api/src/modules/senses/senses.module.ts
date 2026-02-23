import { Module } from '@nestjs/common';
import { SensesService } from './senses.service';
import { SensesController } from './senses.controller';

@Module({
  providers: [SensesService],
  controllers: [SensesController]
})
export class SensesModule {}
