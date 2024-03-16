import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdatePasswordDto } from './dto/UpdatePasswordDto';
import { v4 as uuidv4 } from 'uuid';
import { ID_LENGTH } from 'src/utils/constants';
import { err400, err403, err404 } from 'src/utils/errors';
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

    const userToFind = await this.userRepository.findOneBy({ id });
    if (userToFind === null) {
      err404('User not found!');
    }

    return {
      ...userToFind,
      password: undefined,
    };
  }

  async postUser(createUserDto: CreateUserDto) {
    if (
      !(createUserDto.login && typeof createUserDto.login === 'string') ||
      !(createUserDto.password && typeof createUserDto.password === 'string')
    ) {
      err400('Incorrect user data!');
    }

    const at = new Date().getTime() % 10000000000;

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

    const userToUpdate = await this.userRepository.findOneBy({ id });

    if (!userToUpdate) {
      err404('User not found!');
    }

    if (userToUpdate.password != updatePasswordDto.oldPassword) {
      err403('The old password is not correct!');
    }

    userToUpdate.password = updatePasswordDto.newPassword;
    userToUpdate.version++;
    userToUpdate.updatedAt = new Date().getTime() % 10000000000;

    await this.userRepository.save(userToUpdate);

    return { ...userToUpdate, password: undefined };
  }

  async deleteUser(id: string, res: any) {
    if (id.length != ID_LENGTH) {
      err400('Invalid id!');
    }

    const userToDelete = await this.userRepository.delete({ id });
    console.log(userToDelete);
    if (userToDelete.affected === 0) {
      err404('User not found!');
    }

    return res.status(204).send();
  }
}
