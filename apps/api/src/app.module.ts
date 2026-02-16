import { Module } from '@nestjs/common';
import { HeadwordsModule } from './modules/headwords/headwords.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, HeadwordsModule],
})
export class AppModule {}
