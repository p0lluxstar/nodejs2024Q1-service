import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/* const at = Math.round(new Date().getTime() / 1000); */

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  version: number;

  @Column()
  createdAt: number;

  @Column()
  updatedAt: number;
}
