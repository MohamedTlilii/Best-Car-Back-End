import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @Column()
  password: string;

  @Column({ nullable: true })
  confirmpassword: string;

  @Column({ default: true })
  isActive: boolean;
}
