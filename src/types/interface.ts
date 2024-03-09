export interface Idb {
  users: Iuser[];
  artists: Iartist[];
  tracks: Itrack[];
  albums: Ialbum[];
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

export interface Itrack {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export interface Ialbum {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}
