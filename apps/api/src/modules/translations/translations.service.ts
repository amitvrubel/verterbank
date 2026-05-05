import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTranslationDto } from './dto/create-translation.dto';
import { UpdateTranslationDto } from './dto/update-translation.dto';

@Injectable()
export class TranslationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    senseId: string,
    { order, lang, text, note }: CreateTranslationDto,
  ) {
    const sense = await this.prisma.sense.findUnique({
      where: {
        id: senseId,
      },
      select: { id: true },
    });

    if (!sense) {
      throw new NotFoundException(`Sense with id ${senseId} not found`);
    }

    let o = order;
    if (o === undefined || o === null) {
      const last = await this.prisma.senseTranslation.findFirst({
        where: { senseId },
        orderBy: { order: 'desc' },
        select: { order: true },
      });
      o = last ? last.order + 1 : 0;
    }

    return this.prisma.senseTranslation.create({
      data: {
        senseId,
        lang,
        text,
        note,
        order: o,
      },
    });
  }

  async update(translationId: string, dto: UpdateTranslationDto) {
    await this.findTranslationForSenseOrThrow(translationId);

    return this.prisma.senseTranslation.update({
      where: { id: translationId },
      data: {
        ...(dto.lang !== undefined && { lang: dto.lang }),
        ...(dto.text !== undefined && { text: dto.text }),
        ...(dto.note !== undefined && { note: dto.note }),
        ...(dto.order !== undefined && { order: dto.order }),
      },
    });
  }

  async delete(id: string) {
    await this.findTranslationForSenseOrThrow(id);
    return this.prisma.senseTranslation.delete({
      where: { id },
    });
  }

  private async findTranslationForSenseOrThrow(translationId: string) {
    const translation = await this.prisma.senseTranslation.findUnique({
      where: { id: translationId },
      select: { id: true, senseId: true },
    });

    if (!translation) {
      throw new NotFoundException(`Translation ${translationId} not found `);
    }

    return translation;
  }
}
