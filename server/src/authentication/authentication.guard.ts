import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
  
      if (!authHeader) {
        throw new UnauthorizedException('Authorization header is missing');
      }
  
      const [bearer, token] = authHeader.split(' ');
  
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('Invalid token');
      }
  
      try {
        this.jwtService.verify(token);
        return true;
      } catch (error) {
        throw new UnauthorizedException('Invalid token');
      }
    }
  }
  