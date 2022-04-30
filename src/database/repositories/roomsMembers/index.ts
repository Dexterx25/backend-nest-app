import { RoomsMembers } from "src/database/entities";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(RoomsMembers)
export class RoomMemberRepository extends Repository<RoomsMembers> {

}
