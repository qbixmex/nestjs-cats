import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import Role from '../../common/enums/role.enum';
import type ActiveUserInterface from '../../common/interfaces/user-active.interface';

@Injectable()
class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const role = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!role) {
      return true;
    }

    const user = context.switchToHttp().getRequest().user as ActiveUserInterface;

    if (user.role === Role.ADMIN) {
      return true;
    }

    return user.role === role;
  }
}

export default RolesGuard;
