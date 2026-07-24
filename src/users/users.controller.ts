import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { sendResponse } from 'src/common/utils/send-response';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/all')
  async findAll() {
    const result = await this.usersService.findAll();
    return sendResponse({
      statusCode: 200,
      message: 'All users retrieved successfully',
      data: result,
    });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.usersService.findOne(id);
    return sendResponse({
      statusCode: 200,
      message: 'User retrieved successfully',
      data: result,
    });
  }

  @Get('/email/:email')
  async findByEmail(@Param('email') email: string) {
    const result = await this.usersService.findByEmail(email);
    return sendResponse({
      statusCode: 200,
      message: 'User retrieved successfully',
      data: result,
    });
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const result = await this.usersService.update(id, updateUserDto);
    return sendResponse({
      statusCode: 200,
      message: 'User updated successfully',
      data: result,
    });
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.remove(id);
    return sendResponse({
      statusCode: 200,
      message: 'User deleted successfully',
    });
  }
}
