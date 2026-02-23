import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateExampleDto } from './dto/create-example.dto';

@Injectable()
export class ExamplesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(senseId: string, { order, textYi }: CreateExampleDto) {
    const senses = await this.prisma.sense.findUnique({
      where: { id: senseId },
      select: { id: true },
    });

    if (!senses) {
      throw new NotFoundException(`Sense with id ${senseId} not found`);
    }

    let o = order;
    if (order === undefined || order === null) {
      const last = await this.prisma.example.findFirst({
        where: { senseId },
        orderBy: { order: 'desc' },
        select: { order: true },
      });
      order = last ? last.order + 1 : 0;
    }
    return this.prisma.example.create({
      data: {
        senseId,
        textYi,
        order,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.example.delete({
      where: { id },
    });
  }
}
