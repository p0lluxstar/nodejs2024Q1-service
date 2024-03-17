import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { CreateArtistDto } from './dto/CreateArtistDto';
import { UpdateArtistDto } from './dto/UpdateArtistDto';
import { v4 as uuidv4 } from 'uuid';
import { ID_LENGTH } from 'src/utils/constants';
import { err400, err404 } from 'src/utils/errors';
import { ChangePropertyObjectToNull } from 'src/utils/ChangePropertyObjectToNull';
import {
  RemoveObjectFromArray,
  RemoveObjectFromArrayTwo,
} from 'src/utils/removeObjectFromArray';
import { ArtistEntity } from './artist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  async getArtists(): Promise<ArtistEntity[]> {
    return await this.artistRepository.find();
  }

  async getArtistById(id: string) {
    if (id.length != ID_LENGTH) {
      err400('Invalid id!');
    }

    const artistToFind = await this.artistRepository.findOneBy({ id });
    if (!artistToFind) {
      err404('User not found!');
    }

    return artistToFind;
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

    const newArtist = new ArtistEntity();
    Object.assign(newArtist, dataNewArtist);
    await this.artistRepository.save(newArtist);

    return newArtist;
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

    const artistToUpdate = await this.artistRepository.findOneBy({ id });

    if (!artistToUpdate) {
      err404('Artist not found!');
    }

    artistToUpdate.name = updateArtistDto.name;
    artistToUpdate.grammy = updateArtistDto.grammy;

    await this.artistRepository.save(artistToUpdate);

    return artistToUpdate;
  }

  async deleteArtist(id: string, res: any) {
    if (id.length != ID_LENGTH) {
      err400('Invalid id!');
    }

    const artistToDelete = await this.artistRepository.delete({ id });

    if (artistToDelete.affected === 0) {
      err404('Artist not found!');
    }

    await this.artistRepository.delete(id);

    /* RemoveObjectFromArray(id, 'artists');
    RemoveObjectFromArrayTwo(id, 'favs', 'artists');
    ChangePropertyObjectToNull(db.albums, id, 'artistId');
    ChangePropertyObjectToNull(db.tracks, id, 'artistId'); */

    return res.status(204).send();
  }
}
