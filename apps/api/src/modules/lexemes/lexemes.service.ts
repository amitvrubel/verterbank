import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLexemeDto } from './dto/create-lexeme.dto';
import { PublishStatus } from '@prisma/client';

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
}
