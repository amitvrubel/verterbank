import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import type { AuthenticatedRequest } from '../types/AuthenticatedRequest';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User must be authenticated');
    }

    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Admin access required for this operation');
    }

    return true;
  }
}
