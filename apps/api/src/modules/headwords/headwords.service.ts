import { Injectable, NotFoundException } from '@nestjs/common';
import { PublishStatus } from '@prisma/client';
import { normalizeYiddish } from '../../common/normalize/normalize-yiddish';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class HeadwordsService {
  constructor(private readonly prisma: PrismaService) {}

  async createHeadword(orth: string) {
    const searchOrth = normalizeYiddish(orth);

    return this.prisma.headword.create({
      data: {
        orth,
        searchOrth,
        status: PublishStatus.DRAFT,
      },
    });
  }

  async search(query: string) {
    const normalized = normalizeYiddish(query);
    if (!normalized) {
      return [];
    }

    return this.prisma.headword.findMany({
      where: {
        searchOrth: {
          startsWith: normalized,
          mode: 'insensitive',
        },
      },
      orderBy: {
        searchOrth: 'asc',
      },
      take: 20,
      include: {
        lexemes: {
          include: {
            senses: true,
          },
        },
      },
    });
  }

  async findById(id: string) {
    const headword = await this.prisma.headword.findUnique({
      where: {
        id,
      },
      include: {
        lexemes: {
          orderBy: { id: 'asc' },
          include: {
            senses: {
              orderBy: { order: 'asc' },
              include: {
                translations: {
                  orderBy: { order: 'asc' },
                },
                examples: {
                  orderBy: { order: 'asc' },
                },
              },
            },
            forms: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });
    if (!headword) {
      throw new NotFoundException(`Headword with id ${id} not found`);
    }
    return headword;
  }
}
