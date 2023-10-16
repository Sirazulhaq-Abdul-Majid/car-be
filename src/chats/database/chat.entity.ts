import { Base } from "src/base/database/base.entity";
import { Cars } from "src/cars/database/cars.entity";
import { Users } from "src/users/database/users.entity";
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class Chats extends Base {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  //relations
  @ManyToOne(() => Cars, cars => cars.chat, { nullable: true })
  car: Cars

  @ManyToOne(() => Users, users => users.chat)
  user: Users

  @ManyToOne(() => Users, users => users.received_text)
  recipient: Users
}
