import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpInput } from './dto/sign-up-input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { LoginInput } from './dto/login-input';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpInput: SignUpInput) {
    const hashedPassword = await argon.hash(signUpInput.password);
    const token = this.jwtService.sign({
      email: signUpInput.email,
      name: signUpInput.name,
    });
    const existingUser = await this.prisma.user.findUnique({
      where: { email: signUpInput.email },
    });
    if (existingUser) {
      throw new Error('Email already in use');
    }
    const user = await this.prisma.user.create({
      data: {
        email: signUpInput.email,
        name: signUpInput.name,
        hashedPassword,
        hashedToken: token,
      },
    });

    return {
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    };
  }

  async login(loginInput: LoginInput) {
    const { email, password } = loginInput;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await argon.verify(user.hashedPassword, password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      email: user.email,
      id: user.id,
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { hashedToken: token },
    });

    return {
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthInput: UpdateAuthInput) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
