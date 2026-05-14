import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { sendResponse } from 'src/common/utils/send-response';
import { AuthGuard } from './auth.guard';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() RegisterDto: RegisterDto) {
    const result = await this.authService.register(RegisterDto);
    return sendResponse({
      statusCode: 201,
      message: 'User registered successfully',
      data: result,
    });
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return sendResponse({
      statusCode: 200,
      message: 'User logged in successfully',
      data: result,
    });
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile() {
    return sendResponse({
      statusCode: 200,
      message: 'User profile retrieved successfully',
      data: {
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
    });
  }
}
