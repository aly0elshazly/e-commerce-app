
import { Roles } from '@common/decorators';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    
    // Check if route is public first
    const publicVal = this.reflector.get('PUBLIC', context.getHandler());
    if (publicVal) return true;
    
    // Get roles from HANDLER (method level), not class
    const roles = this.reflector.get(Roles, context.getHandler());
    
    // If no roles defined, allow access
    if (!roles || roles.length === 0) {
      return true;
    }
    
    //  Check if user exists
    if (!request.user) {
      throw new UnauthorizedException("User not authenticated");
    }
    
    // Check if user has required role
    if (!roles.includes(request.user.role)) {
      throw new UnauthorizedException("Not allowed - insufficient permissions");
    }
    
    return true;
  }
}