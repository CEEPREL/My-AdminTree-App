import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common'; // Import the decorator to apply guards
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { SignUpInput } from './dto/sign-up-input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { AuthResponse } from './dto/auth-response';
import { LoginInput } from './dto/login-input';
import { JwtAuthGuard } from './jwt-auth.guard';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  signUp(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.signUp(signUpInput);
  }

  @Mutation(() => AuthResponse)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }
}
