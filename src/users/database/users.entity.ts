import { Auth } from "src/auth/database/auth.entity";
import { Base } from "src/base/database/base.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt'
import { Cars } from "src/cars/database/cars.entity";
import { Chats } from "src/chats/database/chat.entity";
import { VerifyEmail } from "src/auth/database/verify-email.entity";
import { ForgetPassword } from "src/auth/database/forget-password.entity";

@Entity()
export class Users extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  full_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

  @Column({ unique: true })
  login_id: string;

  @Column({ default: 1 })
  role: number

  @Column()
  state: string;

  @Column()
  city: string;

  //Password hashing
  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt()
    this.password_hash = await bcrypt.hash(this.password_hash, salt)
  }

  //relations

  @OneToMany(() => ForgetPassword, forgetpassword => forgetpassword.user)
  forgetPassword: VerifyEmail

  @OneToMany(() => Auth, auth => auth.users)
  auth: Auth[];

  @OneToMany(() => VerifyEmail, verifyemail => verifyemail.user)
  verifiedEmail: VerifyEmail

  @OneToMany(() => Cars, cars => cars.users)
  cars: Cars[]

  @OneToMany(() => Chats, chats => chats.user)
  chat: Chats[]

  @OneToMany(() => Chats, chats => chats.recipient)
  received_text: Chats[]

  @ManyToMany(() => Cars, cars => cars.reviewers)
  @JoinTable({
    name: 'user_review',
    joinColumn: { name: 'users_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'cars_id', referencedColumnName: 'id' }
  })
  review: Cars[]
}
