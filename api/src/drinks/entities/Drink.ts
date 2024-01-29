import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DrinkType } from '../drinks.types';

@Entity()
export class Drink {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ['beer', 'cocktail', 'soft', 'wine', 'mocktail'],
    nullable: false,
  })
  type: DrinkType;
}
