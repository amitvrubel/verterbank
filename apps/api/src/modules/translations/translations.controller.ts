import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateTranslationDto } from './dto/create-translation.dto';
import { TranslationsService } from './translations.service';

@Controller('senses/:senseId/translations')
export class TranslationsController {
  constructor(private readonly translationsService: TranslationsService) {}
  @Post()
  create(
    @Param('senseId') senseId: string,
    @Body() createTranslationDto: CreateTranslationDto,
  ) {
    return this.translationsService.create(senseId, createTranslationDto);
  }

  @Delete(':translationId')
  delete(@Param('translationId') translationId: string) {
    return this.translationsService.delete(translationId);
  }
}
