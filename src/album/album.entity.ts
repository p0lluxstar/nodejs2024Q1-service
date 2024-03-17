import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
