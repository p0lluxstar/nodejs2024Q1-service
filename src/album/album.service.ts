import { Ialbum } from 'src/types/interface';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { CreateAlbumDto } from './dto/CreateAlbumDto';
import { UpdateAlbumDto } from './dto/UpdateAlbumDto';
import { err400, err404 } from 'src/utils/errors';
import { v4 as uuidv4 } from 'uuid';
import { ID_LENGTH } from 'src/utils/constants';
import { AlbumEntity } from './album.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteEntity } from 'src/favorite/favorite.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,

    @InjectRepository(FavoriteEntity)
    private readonly favoriteRepository: Repository<FavoriteEntity>,
  ) {}
  async getAlbums(): Promise<Ialbum[]> {
    return await this.albumRepository.find();
  }

  async getAlbumById(id: string): Promise<Ialbum> {
    if (id.length != ID_LENGTH) {
      err400('Invalid id!');
    }

    const albumToFind = await this.albumRepository.findOneBy({ id });

    if (!albumToFind) {
      err404('Album not found!');
    }

    return albumToFind;
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

    const newAlbum = {
      id: uuidv4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
    };

    await this.albumRepository.save(newAlbum);

    return newAlbum;
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

    const albumToUpdate = await this.albumRepository.findOneBy({ id });

    if (!albumToUpdate) {
      err404('Album not found!');
    }

    albumToUpdate.name = updateAlbumDto.name;
    albumToUpdate.year = updateAlbumDto.year;
    albumToUpdate.artistId = updateAlbumDto.artistId;

    return albumToUpdate;
  }

  async deleteAlbum(id: string, res: any) {
    if (id.length != ID_LENGTH) {
      err400('Invalid id!');
    }

    const albumToDelete = await this.albumRepository.delete({ id });

    if (albumToDelete.affected === 0) {
      err404('Album not found!');
    }

    await this.favoriteRepository
      .createQueryBuilder()
      .delete()
      .where('albums = :albums', {
        albums: id,
      })
      .execute();

    return res.status(204).send();
  }
}
