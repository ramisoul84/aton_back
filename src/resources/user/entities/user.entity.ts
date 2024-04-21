import { Client } from 'src/resources/client/entities/client.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 255 })
  surname: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  patronymic?: string;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ default: false })
  isAdmin?: boolean;

  @Column({ type: 'timestamptz' })
  createdAt?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  lastLoginAt?: Date;

  @OneToMany(() => Client, (client: Client) => client.user)
  @JoinColumn()
  clients: Client[];
}
