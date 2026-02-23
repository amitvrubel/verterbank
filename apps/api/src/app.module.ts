import { Module } from '@nestjs/common';
import { HeadwordsModule } from './modules/headwords/headwords.module';
import { PrismaModule } from './prisma/prisma.module';
import { LexemesModule } from './modules/lexemes/lexemes.module';
import { SensesModule } from './modules/senses/senses.module';
import { TranslationsModule } from './modules/translations/translations.module';
import { ExamplesModule } from './modules/examples/examples.module';
import { FormsModule } from './modules/forms/forms.module';

@Module({
  imports: [PrismaModule, HeadwordsModule, LexemesModule, SensesModule, TranslationsModule, ExamplesModule, FormsModule],
})
export class AppModule {}
