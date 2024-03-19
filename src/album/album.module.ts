import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity';
import { FavoriteEntity } from 'src/favorite/favorite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlbumEntity]),
    TypeOrmModule.forFeature([FavoriteEntity]),
  ],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
