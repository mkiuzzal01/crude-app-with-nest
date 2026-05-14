import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { sendResponse } from 'src/common/utils/send-response';

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
}
