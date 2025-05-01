import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext, CanActivate } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql'; // Import this for GraphQL context
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Use GqlExecutionContext to get the correct request context for GraphQL
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req; // Get the request object from the context

    const token = request.headers.authorization?.split(' ')[1]; // Extract token from 'Authorization' header

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET, // Use the secret from your environment variable
      });
      request.user = decoded; // Attach the decoded JWT payload to the request
      return true;
    } catch (error) {
      console.error('JWT verification failed:', error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
