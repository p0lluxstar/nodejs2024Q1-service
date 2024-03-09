import { Iartist } from 'src/types/interface';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { db } from 'src/data/db';
import { CreateArtistDto } from './dto/CreateArtistDto';
import { v4 as uuidv4 } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';
import { FindObjectById } from 'src/utils/findDataUserById';

@Injectable()
export class ArtistService {
  async getArtists(): Promise<Iartist[]> {
    return db.artists;
  }

  async getArtistById(id: string) {
    if (!(id.length === 36)) {
      throw new HttpException('Invalid id!', HttpStatus.BAD_REQUEST);
    }

    const foundObjectById = FindObjectById(db.artists, id);

    if (foundObjectById === undefined) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    return foundObjectById;
  }

  async postArtist(createArtistDto: CreateArtistDto) {
    if (
      !(createArtistDto.name && typeof createArtistDto.name === 'string') ||
      !(createArtistDto.grammy && typeof createArtistDto.grammy === 'boolean')
    ) {
      throw new HttpException('Incorrect artist data!', HttpStatus.BAD_REQUEST);
    }

    const dataNewArtist = {
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };

    db.artists.push(dataNewArtist);

    return dataNewArtist;
  }
}
