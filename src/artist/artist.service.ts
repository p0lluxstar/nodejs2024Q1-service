import { Iartist } from 'src/types/interface';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { db } from 'src/data/db';
import { CreateArtistDto } from './dto/CreateArtistDto';
import { UpdateArtistDto } from './dto/UpdateArtistDto';
import { v4 as uuidv4 } from 'uuid';
import { FindObjectById } from 'src/utils/findDataUserById';
import { ID_LENGTH } from 'src/utils/constants';
import { err400, err404 } from 'src/utils/errors';

@Injectable()
export class ArtistService {
  async getArtists(): Promise<Iartist[]> {
    return db.artists;
  }

  async getArtistById(id: string) {
    if (id.length != ID_LENGTH) {
      err400('Invalid id!');
    }

    const foundObjectById = FindObjectById(db.artists, id);

    if (foundObjectById === undefined) {
      err404('Artist not found!');
    }

    return foundObjectById;
  }

  async postArtist(createArtistDto: CreateArtistDto) {
    if (
      !(createArtistDto.name && typeof createArtistDto.name === 'string') ||
      !(createArtistDto.grammy && typeof createArtistDto.grammy === 'boolean')
    ) {
      err400('Incorrect artist data!');
    }

    const dataNewArtist = {
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };

    db.artists.push(dataNewArtist);

    return dataNewArtist;
  }

  async putArtist(updateArtistDto: UpdateArtistDto, id: string) {
    if (id.length != ID_LENGTH) {
      err400('Invalid id!');
    }

    if (
      !(updateArtistDto.name && typeof updateArtistDto.name === 'string') ||
      !(typeof updateArtistDto.grammy === 'boolean')
    ) {
      err400('Incorrect artist data!');
    }

    const foundObjectById = FindObjectById(db.artists, id);

    if (foundObjectById === undefined) {
      err404('Artist not found!');
    }

    foundObjectById.name = updateArtistDto.name;
    foundObjectById.grammy = updateArtistDto.grammy;

    return foundObjectById;
  }

  async deleteArtist(id: string, res) {
    if (id.length != ID_LENGTH) {
      err400('Invalid id!');
    }

    const foundObjectById: Iartist = FindObjectById(db.artists, id);

    if (foundObjectById === undefined) {
      err404('Artist not found!');
    }

    db.artists = db.artists.filter((artist) => artist.id !== id);
    db.favs.artists = db.favs.artists.filter((artist) => artist.id !== id);
    return res.status(204).send();
  }
}
