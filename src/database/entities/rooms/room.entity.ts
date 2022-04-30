import { Timestamps } from "../timestamp/timestamp.entity";
import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "../users/users.entity";
import { RoomsMembers } from "../membersRoom/membersRooms.entity";
@Entity("nextto_rooms")
export class Rooms extends Timestamps {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 200 })
  name!: string;
  
  @ManyToOne(_type => User, user => user.id)
  user!: User
  
  @OneToMany(_type => RoomsMembers, user => user.id)
  member!: RoomsMembers[]
  
  
}
