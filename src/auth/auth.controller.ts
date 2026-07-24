import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { sendResponse } from 'src/common/utils/send-response';
import { SetCookies } from 'src/common/decorators/set-cookies.decorator';
import { CookieInterceptor } from 'src/common/interceptors/cookie.interceptor';
// import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('auth')
@UseInterceptors(CookieInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    const result = await this.authService.register(registerDto);

    return sendResponse({
      statusCode: HttpStatus.CREATED,
      message: 'User registered successfully',
      data: result,
    });
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @SetCookies({ name: 'authToken', keyPath: 'accessToken' })
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return result;
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @SetCookies({ name: 'authToken', keyPath: '', options: { maxAge: 0 } })
  async logout() {
    return sendResponse({
      statusCode: HttpStatus.OK,
      message: 'User logged out successfully',
    });
  }

  // @Get('profile')
  // @UseGuards(AuthGuard)
  // @HttpCode(HttpStatus.OK)
  // async getProfile(@CurrentUser() user: any) {

  //   const profile = await this.authService.getProfile(user.sub);

  //   return sendResponse({
  //     statusCode: HttpStatus.OK,
  //     message: 'User profile retrieved successfully',
  //     data: profile,
  //   });
  // }
}
