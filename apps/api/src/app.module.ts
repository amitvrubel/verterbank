import { Module } from '@nestjs/common';
import { HeadwordsModule } from './modules/headwords/headwords.module';
import { PrismaModule } from './prisma/prisma.module';
import { LexemesModule } from './modules/lexemes/lexemes.module';
import { SensesModule } from './modules/senses/senses.module';
import { TranslationsModule } from './modules/translations/translations.module';
import { ExamplesModule } from './modules/examples/examples.module';
import { FormsModule } from './modules/forms/forms.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    HeadwordsModule,
    LexemesModule,
    SensesModule,
    TranslationsModule,
    ExamplesModule,
    FormsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
