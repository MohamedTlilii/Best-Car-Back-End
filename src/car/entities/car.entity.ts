import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Event } from '../../event/entities/event.entity';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  brand: string;

  @Column({ nullable: true })
  model: string;

  @Column({ nullable: true })
  year: number;

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  mileage: number;

  @Column({ nullable: true })
  isAvailable: boolean;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Event, (event) => event.car)
  events: Event[];
}
