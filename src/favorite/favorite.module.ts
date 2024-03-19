import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { FavoriteEntity } from './favorite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from 'src/artist/artist.entity';
import { AlbumEntity } from 'src/album/album.entity';
import { TrackEntity } from 'src/track/track.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoriteEntity]),
    TypeOrmModule.forFeature([ArtistEntity]),
    TypeOrmModule.forFeature([AlbumEntity]),
    TypeOrmModule.forFeature([TrackEntity]),
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
