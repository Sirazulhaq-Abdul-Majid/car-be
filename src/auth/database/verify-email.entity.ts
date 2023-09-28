import { Base } from "src/base/database/base.entity";
import { Users } from "src/users/database/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity('verify_email')
export class VerifyEmail extends Base {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  token: number

  //relations
  @ManyToOne(() => Users, user => user.verifiedEmail)
  user: Users
}
