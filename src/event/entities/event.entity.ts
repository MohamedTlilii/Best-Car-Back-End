import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Car } from '../../car/entities/car.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  note: string;

  @Column()
  startdate: string;

  @Column()
  enddate: string;

  @Column({ nullable: true })
  identityCardFront: string;

  @Column({ nullable: true })
  identityCardBack: string;

  @Column({ nullable: true })
  permitFront: string;

  @Column({ nullable: true })
  permitBack: string;

  @ManyToOne(() => Car, (car) => car.events, { onDelete: 'CASCADE' })
  car: Car;
}
