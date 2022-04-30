import { Timestamps } from "../timestamp/timestamp.entity";
import { PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { Rooms } from "../rooms/room.entity";
import { User } from "../users/users.entity";

@Entity("nextto_roomsMembers")
export class RoomsMembers extends Timestamps {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  
  @ManyToOne(_type => Rooms, rooms => rooms.id)
  rooms!: Rooms

  @ManyToOne(_type => User, user => user.id)
  user!: User
  
}
