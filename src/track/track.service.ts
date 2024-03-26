import { Itrack } from 'src/types/interface';
import { CreateTrackDto } from './dto/CreateTrackDto';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { err400, err404 } from 'src/utils/errors';
import { v4 as uuidv4 } from 'uuid';
import { ID_LENGTH } from 'src/utils/constants';
import { UpdateTrackDto } from './dto/UpdateTrackDto';
import { TrackEntity } from './track.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteEntity } from 'src/favorite/favorite.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,

    @InjectRepository(FavoriteEntity)
    private readonly favoriteRepository: Repository<FavoriteEntity>,
  ) {}

  async getTracks(): Promise<Itrack[]> {
    return await this.trackRepository.find();
  }

  async getTrackById(id: string) {
    if (id.length != ID_LENGTH) {
      err400('Invalid id!');
    }

    const trackToFind = await this.trackRepository.findOneBy({ id });

    if (!trackToFind) {
      err404('Track not found!');
    }

    return trackToFind;
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

    const newTrack = {
      id: uuidv4(),
      name: createTrackDto.name,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
      duration: createTrackDto.duration,
    };

    await this.trackRepository.save(newTrack);

    return newTrack;
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

    const trackToUpdate = await this.trackRepository.findOneBy({ id });

    if (!trackToUpdate) {
      err404('Track not found!');
    }

    return trackToUpdate;
  }

  async deleteTrack(id: string, res: any) {
    if (id.length != ID_LENGTH) {
      err400('Invalid id!');
    }

    const trackToDelete = await this.trackRepository.delete({ id });

    if (trackToDelete.affected === 0) {
      err404('Track not found!');
    }

    await this.favoriteRepository
      .createQueryBuilder()
      .delete()
      .where('tracks = :tracks', {
        tracks: id,
      })
      .execute();

    return res.status(204).send();
  }
}
