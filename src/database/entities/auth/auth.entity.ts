import { Timestamps } from "../timestamp/timestamp.entity";
import { PrimaryGeneratedColumn, Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "../users/users.entity";
@Entity("nextto_auth")
export class Auth extends Timestamps {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 200 })
  password!: string;
  
  @Column({nullable: true})
  access_token?: string;

  
  @Column({nullable: true})
  refresh_token?: string;

  @JoinColumn()
  @OneToOne(_type => User, user => user.id)
  user_id!: User;

}
