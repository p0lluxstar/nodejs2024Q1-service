import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { ArtistEntity } from 'src/artist/artist.entity';

@Entity({ name: 'favorites' })
export class FavoriteEntity {
  @PrimaryColumn()
  id: number;

  @Column('simple-array')
  artists: string[];

  @Column('simple-array')
  albums: string[];

  @Column('simple-array')
  tracks: string[];

  /* @ManyToOne(() => ArtistEntity, (artist) => artist.id) artist: ArtistEntity; */
}
