import { Timestamps } from "../timestamp/timestamp.entity";
import { PrimaryGeneratedColumn, Entity, Column, OneToMany, OneToOne } from "typeorm";
import { Auth } from "../auth/auth.entity";
import { Rooms } from "../rooms/room.entity";
import { RoomsMembers } from "../membersRoom/membersRooms.entity";
@Entity("nextto_users")
export class User extends Timestamps {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 200 })
  email!: string;

  @Column({ length: 200 })
  full_name!: string;

  @Column({ length: 200 })
  nikename!: string;

  @Column({ length: 200 })
  names!: string;

  @Column({ length: 200 })
  lastnames!: string;

  @OneToOne(_type => Auth, auth => auth.user_id)
  auths!: Auth

  
  @OneToMany(_type => Rooms, rooms => rooms.id)
  rooms!: Rooms[]

  @OneToMany(_type => RoomsMembers, member => member.id)
  member!: RoomsMembers[]
  
}
