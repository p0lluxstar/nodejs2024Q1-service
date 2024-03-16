import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
