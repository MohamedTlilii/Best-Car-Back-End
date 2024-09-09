import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Car } from '../../car/entities/car.entity'; // Adjust path if necessary

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  date: string;

  @ManyToOne(() => Car, (car) => car.events)
  car: Car;
}
