import { Base } from "src/base/database/base.entity";
import { Users } from "src/users/database/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('auth')
export class Auth extends Base {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  refresh_token: string

  @ManyToOne(() => Users, users => users.auth)
  users: Users
}
