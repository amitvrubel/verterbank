import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserStatusDto } from '../auth/dto/update-user-status.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async updateStatus(id: string, dto: UpdateUserStatusDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        status: dto.status,
      },
      select: {
        id: true,
        email: true,
        displayName: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
