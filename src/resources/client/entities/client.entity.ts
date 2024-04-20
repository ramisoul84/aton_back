import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
