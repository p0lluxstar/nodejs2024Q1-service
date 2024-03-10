export interface Idb {
  users: Iuser[];
  artists: Iartist[];
  tracks: Itrack[];
  albums: Ialbum[];
  favs: {
    artists: Iartist[];
    albums: Ialbum[];
    tracks: Itrack[];
  };
}

export interface Iuser {
  id: string;
  login: string;
  password?: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface Iartist {
  id: string;
  name: string;
  grammy: boolean;
}

export interface Ialbum {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export interface Itrack {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export interface FavoritesResponse {
  artists: Iartist[];
  albums: Ialbum[];
  tracks: Itrack[];
}
