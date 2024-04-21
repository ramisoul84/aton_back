import { User } from 'src/resources/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('client')
export class Client {
  @PrimaryGeneratedColumn('identity')
  accountNumber: number;

  @Column({ type: 'varchar', length: 255 })
  surname: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  patronymic?: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ type: 'varchar', length: 255 })
  inn: string;

  @Column({ type: 'varchar', length: 255 })
  responsibleUser: string;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'IN_PROGRESS', 'REJECTED', 'CLOSED'],
    default: 'PENDING',
  })
  status: 'PENDING' | 'IN_PROGRESS' | 'REJECTED' | 'CLOSED';

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.clients)
  @JoinColumn({ name: 'userId' })
  user: User;
}
