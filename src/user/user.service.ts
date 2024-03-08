import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { db } from 'src/data/db';
import { CreateUserDto } from './dto/CreateUserDto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  getAllUsers() {
    return db.user;
  }

  async createUser(createUserDto: CreateUserDto) {
    return Object.assign({ id: uuidv4() }, createUserDto);
  }
}
