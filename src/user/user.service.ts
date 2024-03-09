import { Iuser } from 'src/types/interface';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { db } from 'src/data/db';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdatePasswordDto } from './dto/UpdatePasswordDto';
import { v4 as uuidv4 } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';
import { DataUserWitoutPassword } from 'src/data/utils/dataUserWitoutPassword';
import { FindObjectById } from 'src/data/utils/findDataUserById';

@Injectable()
export class UserService {
  async getUsers(): Promise<Iuser[]> {
    return DataUserWitoutPassword(db.users);
  }

  async getUserById(id: string): Promise<Iuser[]> {
    if (!(id.length === 36)) {
      throw new HttpException('Invalid id!', HttpStatus.BAD_REQUEST);
    }

    const foundObjectById = FindObjectById(db.users, id);

    if (foundObjectById === undefined) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    return DataUserWitoutPassword([foundObjectById]);
  }

  async postUser(createUserDto: CreateUserDto) {
    if (
      !(createUserDto.login && typeof createUserDto.login === 'string') ||
      !(createUserDto.password && typeof createUserDto.password === 'string')
    ) {
      throw new HttpException('Incorrect user data!', HttpStatus.BAD_REQUEST);
    }

    const at = new Date().getTime();

    const dataNewUser = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: at,
      updatedAt: at,
    };

    db.users.push(dataNewUser);

    return { ...dataNewUser, password: undefined };
  }

  async putUser(updatePasswordDto: UpdatePasswordDto, id: string) {
    if (!(id.length === 36)) {
      throw new HttpException('Invalid id!', HttpStatus.BAD_REQUEST);
    }

    if (
      !(
        updatePasswordDto.oldPassword &&
        typeof updatePasswordDto.oldPassword === 'string'
      ) ||
      !(
        updatePasswordDto.newPassword &&
        typeof updatePasswordDto.newPassword === 'string'
      )
    ) {
      throw new HttpException('Incorrect user data!', HttpStatus.BAD_REQUEST);
    }

    const foundObjectById = FindObjectById(db.users, id);

    if (foundObjectById === undefined) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    if (!(foundObjectById.password === updatePasswordDto.oldPassword)) {
      throw new HttpException(
        'The old password is not correct!',
        HttpStatus.FORBIDDEN,
      );
    }

    foundObjectById.password = updatePasswordDto.newPassword;
    foundObjectById.version++;
    foundObjectById.updatedAt = new Date().getTime();

    return { ...foundObjectById, password: undefined };
  }

  async deleteUser(id: string, res) {
    if (!(id.length === 36)) {
      throw new HttpException('Invalid id!', HttpStatus.BAD_REQUEST);
    }

    const foundObjectById = FindObjectById(db.users, id);

    if (foundObjectById === undefined) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    db.users = db.users.filter((user) => user.id !== id);
    return res.status(204).send();
  }
}
