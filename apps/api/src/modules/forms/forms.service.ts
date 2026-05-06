import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFormDto } from './dto/create-form.dto';
import { normalizeYiddish } from '../../common/normalize/normalize-yiddish';
import { PublishStatus } from '@prisma/client';
import { UpdateFormDto } from './dto/update-form.dto';

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
      case: grammaticalCase,
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
        case: grammaticalCase,
        status: publishStatus ?? PublishStatus.DRAFT,
      },
    });
  }

  async update(id: string, dto: UpdateFormDto) {
    await this.findFormOrThrow(id);

    const data = {
      ...(dto.valueOrth !== undefined && {
        valueOrth: dto.valueOrth,
        valueSearch: normalizeYiddish(dto.valueOrth),
      }),
      ...(dto.valueOrth === undefined &&
        dto.valueSearch !== undefined && { valueSearch: dto.valueSearch }),
      ...(dto.number !== undefined && { number: dto.number }),
      ...(dto.person !== undefined && { person: dto.person }),
      ...(dto.tense !== undefined && { tense: dto.tense }),
      ...(dto.mood !== undefined && { mood: dto.mood }),
      ...(dto.degree !== undefined && { degree: dto.degree }),
      ...(dto.gender !== undefined && { gender: dto.gender }),
      ...(dto.order !== undefined && { order: dto.order }),
      ...(dto.case !== undefined && { case: dto.case }),
    };

    return this.prisma.form.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    await this.findFormOrThrow(id);
    return this.prisma.form.delete({
      where: { id },
    });
  }

  private async findFormOrThrow(id: string) {
    const form = await this.prisma.form.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!form) {
      throw new NotFoundException(`Form ${id} not found`);
    }

    return form;
  }
}
