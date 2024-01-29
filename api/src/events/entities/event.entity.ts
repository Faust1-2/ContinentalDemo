import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserContinental } from '../../users/entities/user.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({
    type: 'enum',
    enum: ['service', 'watch', 'pod'],
    nullable: false,
  })
  type: EventType;

  @Column({ type: 'timestamp with time zone', nullable: true })
  startDate: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  endDate: Date;

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  isAllDay: boolean;

  @Column({ type: 'varchar', nullable: true })
  recurrenceRule: string;

  @Column({ type: 'varchar', nullable: true })
  recurrenceException: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  isReadonly: boolean;

  @ManyToOne(() => UserContinental, (user) => user.events)
  organizer: UserContinental;

  @ManyToMany(() => UserContinental, (user) => user.bartendingEvents)
  @JoinTable()
  bartenders: UserContinental[];
}

export type EventType = 'service' | 'watch' | 'pod';
