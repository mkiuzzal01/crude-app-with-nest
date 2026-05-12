import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UsersService {
  create(registerUser: RegisterDto) {
    return registerUser;
  }

  findAll() {
    return {
      message: 'All users',
      data: [
        {
          id: 1,
          name: 'John Doe',
          email: 'demo@gmail.com',
        },
      ],
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return updateUserDto;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
