import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ArtistEntity } from 'src/artist/artist.entity';

@Entity({ name: 'albums' })
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ type: 'varchar', nullable: true })
  artistId: string | null;

  @ManyToOne(() => ArtistEntity, { onDelete: 'SET NULL' })
  artist: ArtistEntity;
}
