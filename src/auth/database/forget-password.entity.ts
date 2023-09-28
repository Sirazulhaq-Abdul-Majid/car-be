import { Base } from "src/base/database/base.entity";
import { Users } from "src/users/database/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ForgetPassword extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: number

  //relations
  @ManyToOne(() => Users, user => user.forgetPassword)
  user: Users
}
