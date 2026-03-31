import { Injectable, NotFoundException } from '@nestjs/common';
import { PublishStatus } from '@prisma/client';
import { normalizeYiddish } from '../../common/normalize/normalize-yiddish';
import { PrismaService } from '../../prisma/prisma.service';
import { isAlefBeys } from '../../common/normalize/isAlefBeys';

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
    const trimmed = query.trim();

    if (!trimmed) {
      return [];
    }
    const limit = 20;

    if (isAlefBeys(trimmed)) {
      const normalized = normalizeYiddish(trimmed);
      return this.prisma.headword.findMany({
        where: {
          searchOrth: {
            startsWith: normalized,
          },
        },
        select: {
          id: true,
          orth: true,
        },
        take: limit,
      });
    }

    const lowered = trimmed.toLowerCase();

    return this.prisma.headword.findMany({
      where: {
        lexemes: {
          some: {
            yivo: {
              startsWith: lowered,
            },
          },
        },
      },
      select: {
        id: true,
        orth: true,
      },
      take: limit,
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
