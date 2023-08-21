import { Auth } from "src/auth/database/auth.entity";
import { Base } from "src/base/database/base.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt'

@Entity()
export class Users extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  full_name: string;

  @Column()
  email: string;

  @Column()
  password_hash: string;

  @Column()
  login_id: string;

  @Column({ default: 1 })
  role: number

  //Password hashing
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = await bcrypt.genSalt()
    this.password_hash = await bcrypt.hash(this.password_hash, salt)
  }

  //relations
  @OneToMany(() => Auth, auth => auth.users)
  auth: Auth[];


}
