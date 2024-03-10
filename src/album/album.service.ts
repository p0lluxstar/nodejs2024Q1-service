import { Ialbum } from 'src/types/interface';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { db } from 'src/data/db';
import { CreateAlbumDto } from './dto/CreateAlbumDto';
import { UpdateAlbumDto } from './dto/UpdateAlbumDto';
import { err400, err404 } from 'src/utils/errors';
import { v4 as uuidv4 } from 'uuid';
import { ID_LENGTH } from 'src/utils/constants';
import { FindObjectById } from 'src/utils/findDataUserById';

@Injectable()
export class AlbumService {
  async getAlbums(): Promise<Ialbum[]> {
    return db.albums;
  }

  async getAlbumById(id: string): Promise<Ialbum[]> {
    if (id.length != ID_LENGTH) {
      err400('Invalid id!');
    }

    const foundObjectById = FindObjectById(db.albums, id);

    if (foundObjectById === undefined) {
      err404('Album not found!');
    }

    return foundObjectById;
  }

  async postAlbum(createAlbumDto: CreateAlbumDto) {
    if (
      !createAlbumDto.name ||
      typeof createAlbumDto.name !== 'string' ||
      !createAlbumDto.year ||
      typeof createAlbumDto.year !== 'number' ||
      createAlbumDto.artistId === undefined ||
      (typeof createAlbumDto.artistId !== 'string' &&
        createAlbumDto.artistId !== null)
    ) {
      err400('Invalid album data');
    }

    const dataNewAlbum = {
      id: uuidv4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
    };

    db.albums.push(dataNewAlbum);

    return dataNewAlbum;
  }

  async putAlbum(updateAlbumDto: UpdateAlbumDto, id: string) {
    if (id.length != ID_LENGTH) {
      err400('Invalid id!');
    }

    if (
      !updateAlbumDto.name ||
      typeof updateAlbumDto.name !== 'string' ||
      !updateAlbumDto.year ||
      typeof updateAlbumDto.year !== 'number' ||
      updateAlbumDto.artistId === undefined ||
      (typeof updateAlbumDto.artistId !== 'string' &&
        updateAlbumDto.artistId !== null)
    ) {
      err400('Invalid album data');
    }

    const foundObjectById: Ialbum = FindObjectById(db.albums, id);

    if (foundObjectById === undefined) {
      err404('Album not found!');
    }

    foundObjectById.name = updateAlbumDto.name;
    foundObjectById.year = updateAlbumDto.year;
    foundObjectById.artistId = updateAlbumDto.artistId;

    return foundObjectById;
  }

  async deleteAlbum(id: string, res: any) {
    if (id.length != ID_LENGTH) {
      err400('Invalid id!');
    }

    const foundObjectById = FindObjectById(db.albums, id);

    if (foundObjectById === undefined) {
      err404('Album not found!');
    }

    db.albums = db.albums.filter((album) => album.id !== id);
    return res.status(204).send();
  }
}
