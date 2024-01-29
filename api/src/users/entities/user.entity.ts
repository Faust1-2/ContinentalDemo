import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ContinentalRoles } from '@/shared/api-enums';
import { Event } from '@/events/entities/event.entity';

@Entity()
export class UserContinental {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column('varchar', { nullable: true })
  name: string;

  @Column('varchar', { nullable: true })
  surname: string;

  @Column('boolean', { default: false })
  isConfirmed: boolean;

  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar', { nullable: true })
  password: string;

  @Column({
    default: ContinentalRoles.BUREAU_CONTINENTAL,
  })
  role: ContinentalRoles;

  @OneToMany(() => Event, (event) => event.organizer)
  events: Event[];

  @ManyToMany(() => Event, (event) => event.bartenders)
  bartendingEvents: Event[];

  // @BeforeInsert()
  // async encryptPassword() {
  //   const salt = await bcrypt.genSalt();
  //   this.password = await bcrypt.hash(this.password, salt);
  // }
}
