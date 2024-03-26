import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdatePasswordDto } from './dto/UpdatePasswordDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Post()
  async postUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.postUser(createUserDto);
  }

  @Put(':id')
  async putUser(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('id') id: string,
  ) {
    return this.userService.putUser(updatePasswordDto, id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() res) {
    return this.userService.deleteUser(id, res);
  }
}
