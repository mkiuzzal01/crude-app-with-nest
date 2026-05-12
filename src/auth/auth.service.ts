import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async register(registerDto: RegisterDto) {
    const hash = await bcrypt.hash(registerDto.password, 10);
    return this.usersService.create({ ...registerDto, password: hash });
  }
}
