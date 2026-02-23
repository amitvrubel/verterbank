import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFormDto } from './dto/create-form.dto';
import { normalizeYiddish } from '../../common/normalize/normalize-yiddish';
import { PublishStatus } from '@prisma/client';

@Injectable()
export class FormsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    lexemeId: string,
    {
      valueOrth,
      order,
      yivo,
      ipa,
      note,
      publishStatus,
      number,
      person,
      tense,
      mood,
      degree,
      gender,
    }: CreateFormDto,
  ) {
    const lexeme = await this.prisma.lexeme.findUnique({
      where: { id: lexemeId },
      select: { id: true },
    });

    if (!lexeme) {
      throw new NotFoundException(`Lexeme with id ${lexemeId} not found`);
    }

    const valueSearch = normalizeYiddish(valueOrth);
    let o = order;
    if (o === undefined || o === null) {
      const last = await this.prisma.form.findFirst({
        where: { lexemeId },
        orderBy: { order: 'desc' },
        select: { order: true },
      });
      o = last ? last.order + 1 : 0;
    }

    return this.prisma.form.create({
      data: {
        lexemeId,
        valueOrth,
        valueSearch,
        yivo,
        note,
        order: o,
        number,
        person,
        tense,
        mood,
        degree,
        gender,
        status: publishStatus ?? PublishStatus.DRAFT,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.form.delete({
      where: { id },
    });
  }
}
