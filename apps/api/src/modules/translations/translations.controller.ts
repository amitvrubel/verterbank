import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { CreateTranslationDto } from './dto/create-translation.dto';
import { TranslationsService } from './translations.service';
import { UpdateTranslationDto } from './dto/update-translation.dto';

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

  @Patch(':translationId')
  udpate(
    @Param('translationId') translationId: string,
    @Body() dto: UpdateTranslationDto,
  ) {
    return this.translationsService.update(translationId, dto);
  }
  @Delete(':translationId')
  delete(@Param('translationId') translationId: string) {
    return this.translationsService.delete(translationId);
  }
}
