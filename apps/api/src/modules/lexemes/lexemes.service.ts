import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLexemeDto } from './dto/create-lexeme.dto';
import { PublishStatus, RelationType } from '@prisma/client';
import { UpdateLexemeDto } from './dto/update-lexeme.dto';

@Injectable()
export class LexemesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    headwordId: string,
    {
      partOfSpeech,
      grammaticalGender,
      pastAuxiliary,
      yivo,
      ipa,
      notes,
      status,
    }: CreateLexemeDto,
  ) {
    const headword = await this.prismaService.headword.findUnique({
      where: { id: headwordId },
    });
    if (!headword) {
      throw new NotFoundException(`Headword with id ${headwordId} not found`);
    }

    return this.prismaService.lexeme.create({
      data: {
        headwordId,
        partOfSpeech,
        grammaticalGender,
        pastAuxiliary,
        yivo,
        ipa,
        notes,
        status: status ?? PublishStatus.DRAFT,
      },
    });
  }

  async update(id: string, dto: UpdateLexemeDto) {
    await this.findLexemeOrThrow(id);
    return this.prismaService.lexeme.update({
      where: { id },
      data: {
        ...(dto.partOfSpeech !== undefined && {
          partOfSpeech: dto.partOfSpeech,
        }),
        ...(dto.grammaticalGender !== undefined && {
          grammaticalGender: dto.grammaticalGender,
        }),
        ...(dto.pastAuxiliary !== undefined && {
          pastAuxiliary: dto.pastAuxiliary,
        }),
        ...(dto.yivo !== undefined && { yivo: dto.yivo }),
        ...(dto.ipa !== undefined && { ipa: dto.ipa }),
        ...(dto.notes !== undefined && { notes: dto.notes }),
        ...(dto.status !== undefined && { status: dto.status }),
      },
    });
  }

  async delete(id: string) {
    await this.findLexemeOrThrow(id);
    return this.prismaService.lexeme.delete({
      where: { id },
    });
  }

  async getRelations(lexemeId: string) {
    await this.findLexemeOrThrow(lexemeId);

    const relations = await this.prismaService.lexemeRelation.findMany({
      where: { OR: [{ fromLexemeId: lexemeId }, { toLexemeId: lexemeId }] },
      include: {
        fromLexeme: true,
        toLexeme: true,
      },
    });

    return relations.map((relation) => ({
      type: relation.type,
      lexeme:
        relation.fromLexemeId === lexemeId
          ? relation.toLexemeId
          : relation.fromLexemeId,
    }));
  }

  async createRelation(
    fromLexemeId: string,
    toLexemeId: string,
    type: RelationType,
  ) {
    await this.findLexemeOrThrow(fromLexemeId);
    await this.findLexemeOrThrow(toLexemeId);
    return this.prismaService.lexemeRelation.create({
      data: { fromLexemeId, toLexemeId, type },
    });
  }

  async deleteRelation(fromLexemeId: string, toLexemeId: string) {
    return this.prismaService.lexemeRelation.delete({
      where: {
        fromLexemeId_toLexemeId: { fromLexemeId, toLexemeId },
      },
    });
  }

  async getLexeme(id: string) {
    const lexeme = await this.prismaService.lexeme.findUnique({
      where: { id },
      select: {
        id: true,
        partOfSpeech: true,
        grammaticalGender: true,
        pastAuxiliary: true,
        yivo: true,
        ipa: true,
        notes: true,
        senses: true,
        forms: true,
        usageLabels: true,
      },
    });

    if (!lexeme) {
      throw new NotFoundException(`Lexeme with id ${id} not found`);
    }
    return lexeme;
  }

  private async findLexemeOrThrow(id: string) {
    const lexeme = await this.prismaService.lexeme.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!lexeme) {
      throw new NotFoundException(`Lexeme with id ${id} not found`);
    }
    return lexeme;
  }
}
