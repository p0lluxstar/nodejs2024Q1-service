import { Iuser } from 'src/types/interface';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { db } from 'src/data/db';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdatePasswordDto } from './dto/UpdatePasswordDto';
import { v4 as uuidv4 } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';
import { DataUserWitoutPassword } from 'src/utils/dataUserWitoutPassword';
import { FindObjectById } from 'src/utils/findDataUserById';
import { ID_LENGTH } from 'src/utils/constants';
import { err400, err403, err404 } from 'src/utils/errors';

@Injectable()
export class UserService {
  async getUsers(): Promise<Iuser[]> {
    return DataUserWitoutPassword(db.users);
  }

  async getUserById(id: string): Promise<Iuser[]> {
    if (id.length != ID_LENGTH) {
      err400('Invalid id!');
    }

    const foundObjectById = FindObjectById(db.users, id);

    if (foundObjectById === undefined) {
      err404('User not found!');
    }

    return DataUserWitoutPassword([foundObjectById]);
  }

  async postUser(createUserDto: CreateUserDto) {
    if (
      !(createUserDto.login && typeof createUserDto.login === 'string') ||
      !(createUserDto.password && typeof createUserDto.password === 'string')
    ) {
      err400('Incorrect user data!');
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
    if (id.length != ID_LENGTH) {
      err400('Invalid id!');
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
      err400('Incorrect user data!');
    }

    const foundObjectById = FindObjectById(db.users, id);

    if (foundObjectById === undefined) {
      err404('User not found!');
    }

    if (!(foundObjectById.password === updatePasswordDto.oldPassword)) {
      err403('The old password is not correct!');
    }

    foundObjectById.password = updatePasswordDto.newPassword;
    foundObjectById.version++;
    foundObjectById.updatedAt = new Date().getTime();

    return { ...foundObjectById, password: undefined };
  }

  async deleteUser(id: string, res) {
    if (id.length != ID_LENGTH) {
      err400('Invalid id!');
    }

    const foundObjectById = FindObjectById(db.users, id);

    if (foundObjectById === undefined) {
      err404('User not found!');
    }

    db.users = db.users.filter((user) => user.id !== id);
    return res.status(204).send();
  }
}
