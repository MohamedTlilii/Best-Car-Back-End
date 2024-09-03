import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  confirmpassword: string;

  @Column({ nullable: true })
  isAdmin: boolean;

  @Column({ default: true })
  isActive: boolean;
}
