import { Itrack } from 'src/types/interface';
import { CreateTrackDto } from './dto/CreateTrackDto';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { db } from 'src/data/db';
import { err400, err404 } from 'src/utils/errors';
import { v4 as uuidv4 } from 'uuid';
import { ID_LENGTH } from 'src/utils/constants';
import { FindObjectById } from 'src/utils/findDataUserById';
import { UpdateTrackDto } from './dto/UpdateTrackDto';

@Injectable()
export class TrackService {
  async getTracks(): Promise<Itrack[]> {
    return db.tracks;
  }

  async getTrackById(id: string) {
    if (id.length != ID_LENGTH) {
      err400('Invalid id!');
    }

    const foundObjectById = FindObjectById(db.tracks, id);

    if (foundObjectById === undefined) {
      err404('Track not found!');
    }

    return foundObjectById;
  }

  async postTrack(createTrackDto: CreateTrackDto) {
    if (
      !createTrackDto.name ||
      typeof createTrackDto.name !== 'string' ||
      createTrackDto.artistId === undefined ||
      (typeof createTrackDto.artistId !== 'string' &&
        createTrackDto.artistId !== null) ||
      createTrackDto.albumId === undefined ||
      (typeof createTrackDto.albumId !== 'string' &&
        createTrackDto.albumId !== null) ||
      !createTrackDto.duration ||
      typeof createTrackDto.duration !== 'number'
    ) {
      err400('Invalid track data');
    }

    const dataNewAlbum = {
      id: uuidv4(),
      name: createTrackDto.name,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
      duration: createTrackDto.duration,
    };

    db.tracks.push(dataNewAlbum);

    return dataNewAlbum;
  }

  async putTrack(updateTrackDto: UpdateTrackDto, id: string) {
    if (id.length != ID_LENGTH) {
      err400('Invalid id!');
    }

    if (
      !updateTrackDto.name ||
      typeof updateTrackDto.name !== 'string' ||
      updateTrackDto.artistId === undefined ||
      (typeof updateTrackDto.artistId !== 'string' &&
        updateTrackDto.artistId !== null) ||
      updateTrackDto.albumId === undefined ||
      (typeof updateTrackDto.albumId !== 'string' &&
        updateTrackDto.albumId !== null) ||
      !updateTrackDto.duration ||
      typeof updateTrackDto.duration !== 'number'
    ) {
      err400('Invalid track data');
    }

    const foundObjectById: Itrack = FindObjectById(db.tracks, id);

    if (foundObjectById === undefined) {
      err404('Track not found!');
    }

    foundObjectById.name = updateTrackDto.name;
    foundObjectById.artistId = updateTrackDto.artistId;
    foundObjectById.albumId = updateTrackDto.albumId;
    foundObjectById.duration = updateTrackDto.duration;

    return foundObjectById;
  }

  async deleteTrack(id: string, res: any) {
    if (id.length != ID_LENGTH) {
      err400('Invalid id!');
    }

    const foundObjectById = FindObjectById(db.tracks, id);

    if (foundObjectById === undefined) {
      err404('Track not found!');
    }

    db.tracks = db.tracks.filter((track) => track.id !== id);
    return res.status(204).send();
  }
}
