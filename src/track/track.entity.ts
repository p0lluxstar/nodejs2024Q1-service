import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ArtistEntity } from 'src/artist/artist.entity';

@Entity({ name: 'tracks' })
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'varchar', nullable: true })
  artistId: string | null;

  @Column({ type: 'varchar', nullable: true })
  albumId: string | null;

  @Column()
  duration: number;

  @ManyToOne(() => ArtistEntity, { onDelete: 'SET NULL' })
  artist: ArtistEntity;
}
