import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './artist.entity';
import { FavoriteEntity } from 'src/favorite/favorite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArtistEntity]),
    TypeOrmModule.forFeature([FavoriteEntity]),
  ],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
