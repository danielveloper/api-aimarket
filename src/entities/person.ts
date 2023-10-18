import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user';

@Entity('persons')
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  secondName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  @Column()
  secondLastName: string;

  @Column()
  phoneNumber: string;

  @Column()
  street: string;

  @OneToOne(() => User, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
