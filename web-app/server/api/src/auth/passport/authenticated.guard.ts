import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    return req.isAuthenticated();
  }
}
