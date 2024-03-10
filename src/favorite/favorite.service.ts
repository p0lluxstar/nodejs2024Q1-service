import { Iartist, Ialbum, Itrack } from 'src/types/interface';
import { Injectable } from '@nestjs/common';
import { db } from 'src/data/db';
import { err400, err404, err422 } from 'src/utils/errors';
import { ID_LENGTH } from 'src/utils/constants';
import { FindObjectById } from 'src/utils/findDataUserById';

@Injectable()
export class FavoriteService {
  getFavs() {
    console.log(db.favs);
    return db.favs;
  }

  postFavsArtist(id: string) {
    if (id.length != ID_LENGTH) {
      err400('Invalid id!');
    }

    const foundObjectById: Iartist = FindObjectById(db.artists, id);

    if (foundObjectById === undefined) {
      err422('Artist not found!');
    }

    db.favs.artists.push(foundObjectById);

    return foundObjectById;
  }

  postFavsAlbum(id: string) {
    if (id.length != ID_LENGTH) {
      err400('Invalid id!');
    }

    const foundObjectById: Ialbum = FindObjectById(db.albums, id);

    if (foundObjectById === undefined) {
      err422('Album not found!');
    }

    db.favs.albums.push(foundObjectById);

    return foundObjectById;
  }

  postFavsTrack(id: string) {
    if (id.length != ID_LENGTH) {
      err400('Invalid id!');
    }

    const foundObjectById: Itrack = FindObjectById(db.tracks, id);

    if (foundObjectById === undefined) {
      err422('Track not found!');
    }

    db.favs.tracks.push(foundObjectById);

    return foundObjectById;
  }

  deleteFavsArtist(id: string, res: any) {
    if (id.length != ID_LENGTH) {
      err400('Invalid id!');
    }

    const foundObjectById = FindObjectById(db.artists, id);

    if (foundObjectById === undefined) {
      err404('Artist not found!');
    }

    db.favs.artists = db.favs.artists.filter((artist) => artist.id !== id);
    return res.status(204).send();
  }

  deleteFavsAlbum(id: string, res: any) {
    if (id.length != ID_LENGTH) {
      err400('Invalid id!');
    }

    const foundObjectById = FindObjectById(db.albums, id);

    if (foundObjectById === undefined) {
      err404('Artist not found!');
    }

    db.favs.albums = db.favs.albums.filter((album) => album.id !== id);
    return res.status(204).send();
  }

  deleteFavsTrack(id: string, res: any) {
    if (id.length != ID_LENGTH) {
      err400('Invalid id!');
    }

    const foundObjectById = FindObjectById(db.tracks, id);

    if (foundObjectById === undefined) {
      err404('Artist not found!');
    }

    db.favs.tracks = db.favs.tracks.filter((track) => track.id !== id);
    return res.status(204).send();
  }
}
