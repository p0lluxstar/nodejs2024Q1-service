import { Ialbum } from 'src/types/interface';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { db } from 'src/data/db';
import { CreateAlbumDto } from './dto/CreateAlbumDto';

@Injectable()
export class AlbumService {
  async getAlbums(): Promise<Ialbum[]> {
    return db.albums;
  }

  async postAlbum(createAlbumDto: CreateAlbumDto) {
    return createAlbumDto;
  }
}
