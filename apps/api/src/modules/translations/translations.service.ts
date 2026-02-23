import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTranslationDto } from './dto/create-translation.dto';

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

  async delete(id: string) {
    return this.prisma.senseTranslation.delete({
      where: { id },
    });
  }
}
