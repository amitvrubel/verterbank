import { Injectable } from '@nestjs/common';
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
}
