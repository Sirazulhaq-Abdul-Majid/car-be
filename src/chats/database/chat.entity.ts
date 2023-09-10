import { Base } from "src/base/database/base.entity";
import { Users } from "src/users/database/users.entity";
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Chats extends Base {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  //relations
  @ManyToOne(() => Users, users => users.chat)
  user: Users

  @ManyToOne(() => Users, users => users.received_text)
  receipient: Users
}
