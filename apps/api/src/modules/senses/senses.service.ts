import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSenseDto } from './dto/create-sense.dto';
import { PublishStatus } from '@prisma/client';
import { UpdateSenseDto } from './dto/update-sense.dto';

@Injectable()
export class SensesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    lexemeId: string,
    { order, definitionYi, glossYi, status }: CreateSenseDto,
  ) {
    const lexeme = await this.prismaService.lexeme.findUnique({
      where: {
        id: lexemeId,
      },
      select: {
        id: true,
      },
    });
    if (!lexeme) {
      throw new NotFoundException(`Lexeme ${lexemeId} not found`);
    }
    let o = order;
    if (o === undefined || o === null) {
      const last = await this.prismaService.sense.findFirst({
        where: { lexemeId },
        orderBy: { order: 'desc' },
        select: { order: true },
      });
      o = last ? last.order + 1 : 0;
    }
    return this.prismaService.sense.create({
      data: {
        lexemeId,
        definitionYi,
        glossYi,
        order: o,
        status: status || PublishStatus.DRAFT,
      },
    });
  }

  async update(senseId: string, dto: UpdateSenseDto) {
    await this.findSenseForLexemeOrThrow(senseId);

    return this.prismaService.sense.update({
      where: { id: senseId },
      data: {
        ...(dto.definitionYi !== undefined && {
          definitionYi: dto.definitionYi,
        }),
        ...(dto.glossYi !== undefined && { glossYi: dto.glossYi }),
        ...(dto.order !== undefined && { order: dto.order }),
        ...(dto.status !== undefined && { status: dto.status }),
      },
    });
  }

  async remove(senseId: string) {
    await this.findSenseForLexemeOrThrow(senseId);
    return this.prismaService.sense.delete({ where: { id: senseId } });
  }

  private async findSenseForLexemeOrThrow(senseId: string) {
    const sense = await this.prismaService.sense.findUnique({
      where: {
        id: senseId,
      },
      select: {
        id: true,
      },
    });

    if (!sense) {
      throw new NotFoundException(`Sense ${senseId} not found`);
    }

    return sense;
  }
}
