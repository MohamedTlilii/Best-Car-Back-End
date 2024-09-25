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
  image: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  confirmpassword: string;

  @Column({ default: true })
  isAdmin: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  role: 'admin' | 'superadmin';
}
