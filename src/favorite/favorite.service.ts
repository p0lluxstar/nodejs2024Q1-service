import { Injectable } from '@nestjs/common';
import { err400, err422 } from 'src/utils/errors';
import { ID_LENGTH } from 'src/utils/constants';
import { FavoriteEntity } from './favorite.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from 'src/artist/artist.entity';
import { AlbumEntity } from 'src/album/album.entity';
import { TrackEntity } from 'src/track/track.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(FavoriteEntity)
    private readonly favoriteRepository: Repository<FavoriteEntity>,

    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,

    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,

    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
  ) {}
  async getFavs() {
    const favorites = await this.favoriteRepository.find();

    const dataFavorites = { artists: [], albums: [], tracks: [] };

    if (favorites.length === 0) {
      return dataFavorites;
    }

    const artistsInFavorites = favorites
      .map((favorite) => favorite.artists[0])
      .filter((item) => item !== '[]');

    for (const artistId of artistsInFavorites) {
      const artistToFind = await this.artistRepository.findOneBy({
        id: artistId,
      });
      dataFavorites.artists.push(artistToFind);
    }

    const albumsInFavorites = favorites
      .map((favorite) => favorite.albums[0])
      .filter((item) => item !== '[]');

    for (const albumId of albumsInFavorites) {
      const albumToFind = await this.albumRepository.findOneBy({
        id: albumId,
      });
      dataFavorites.albums.push(albumToFind);
    }

    const tracksInFavorites = favorites
      .map((favorite) => favorite.tracks[0])
      .filter((item) => item !== '[]');

    for (const trackId of tracksInFavorites) {
      const trackToFind = await this.trackRepository.findOneBy({
        id: trackId,
      });
      dataFavorites.tracks.push(trackToFind);
    }

    return dataFavorites;
  }

  async postFavsArtist(id: string) {
    if (id.length != ID_LENGTH) {
      err400('Invalid id!');
    }

    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      err422('Artist not found!');
    }

    const favorite = new FavoriteEntity();

    favorite.artists = [id];

    await this.favoriteRepository.save(favorite);

    const artistToFind = await this.artistRepository.findOneBy({ id });

    return artistToFind;
  }

  async postFavsAlbum(id: string) {
    if (id.length != ID_LENGTH) {
      err400('Invalid id!');
    }

    const album = await this.albumRepository.findOneBy({ id });

    if (!album) {
      err422('Album not found!');
    }

    const favorite = new FavoriteEntity();

    favorite.albums = [id];

    await this.favoriteRepository.save(favorite);

    const albumToFind = await this.albumRepository.findOneBy({ id });

    return albumToFind;
  }

  async postFavsTrack(id: string) {
    if (id.length != ID_LENGTH) {
      err400('Invalid id!');
    }

    const track = await this.trackRepository.findOneBy({ id });

    if (!track) {
      err422('Album not found!');
    }

    const favorite = new FavoriteEntity();

    favorite.tracks = [id];

    await this.favoriteRepository.save(favorite);

    const trackToFind = await this.trackRepository.findOneBy({ id });

    return trackToFind;
  }

  async deleteFavsArtist(id: string, res: any) {
    if (id.length != ID_LENGTH) {
      err400('Invalid id!');
    }

    await this.favoriteRepository
      .createQueryBuilder()
      .delete()
      .where('artists = :artists', {
        artists: id,
      })
      .execute();

    return res.status(204).send();
  }

  async deleteFavsAlbum(id: string, res: any) {
    if (id.length != ID_LENGTH) {
      err400('Invalid id!');
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

  async deleteFavsTrack(id: string, res: any) {
    if (id.length != ID_LENGTH) {
      err400('Invalid id!');
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
