import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Gender, Role, Status } from '../user.type';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fname!: string;

  @Column()
  lname!: string;

  @Column({ unique: true })
  email!: string;

  @Column({
    select: false,
  })
  password!: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role!: Role;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  status!: Status;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  dob?: Date;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender?: Gender;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  permanentAddress?: string;

  @Column({ nullable: true })
  presentAddress?: string;
}
