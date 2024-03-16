import { Iuser } from 'src/types/interface';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { db } from 'src/data/db';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdatePasswordDto } from './dto/UpdatePasswordDto';
import { v4 as uuidv4 } from 'uuid';
import { DataUserWitoutPassword } from 'src/utils/dataUserWitoutPassword';
import { FindObjectById } from 'src/utils/findDataUserById';
import { ID_LENGTH } from 'src/utils/constants';
import { err400, err403, err404 } from 'src/utils/errors';
import { RemoveObjectFromArray } from 'src/utils/removeObjectFromArray';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: string) {
    if (id.length != ID_LENGTH) {
      err400('Invalid id!');
    }

    const dataUser = await this.userRepository.findOneBy({ id });
    if (dataUser === null) {
      err404('User not found!');
    }

    return {
      ...dataUser,
      password: undefined,
    };

    /* const foundObjectById = FindObjectById(db.users, id);

    if (foundObjectById === undefined) {
      err404('User not found!');
    }

    return DataUserWitoutPassword([foundObjectById]); */
  }

  async postUser(createUserDto: CreateUserDto) {
    if (
      !(createUserDto.login && typeof createUserDto.login === 'string') ||
      !(createUserDto.password && typeof createUserDto.password === 'string')
    ) {
      err400('Incorrect user data!');
    }

    const at = Math.round(new Date().getTime() / 1000);

    const dataNewUser = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: at,
      updatedAt: at,
    };

    const newUser = new UserEntity();
    Object.assign(newUser, dataNewUser);
    await this.userRepository.save(newUser);
    return {
      ...dataNewUser,
      password: undefined,
    };
    /* 

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

    return { ...dataNewUser, password: undefined }; */
  }

  /* async putUser(updatePasswordDto: UpdatePasswordDto, id: string) {
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
  } */

  /* async deleteUser(id: string, res: any) {
    if (id.length != ID_LENGTH) {
      err400('Invalid id!');
    }

    const foundObjectById: Iuser = FindObjectById(db.users, id);

    if (foundObjectById === undefined) {
      err404('User not found!');
    }

    RemoveObjectFromArray(id, 'users');
    return res.status(204).send();
  } */
}
