import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AlbumEntity } from 'src/album/album.entity';

@Entity({ name: 'artists' })
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => AlbumEntity, (album) => album.artistId)
  albums: AlbumEntity;
}
