import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'favorites' })
export class FavoriteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-array', { default: [] })
  artists: string[];

  @Column('simple-array', { default: [] })
  albums: string[];

  @Column('simple-array', { default: [] })
  tracks: string[];
  albumId: any;
}
