import { InternalServerErrorException } from "@nestjs/common";
import { RoomsMembers, User } from "src/database/entities";
import { Rooms } from "src/database/entities/rooms/index";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Rooms)
export class RoomsRepository extends Repository<Rooms> {
    public async createRoomWithOwnerAndMembers(members: RoomsMembers[], owner: User, nameRoom: string){
        const queryRunner = this.manager.connection.createQueryRunner();
        let err;
        try {
            let respon = {}
          await queryRunner.startTransaction();
          const roomInstance = await queryRunner.manager.create(Rooms, {name: nameRoom});
          roomInstance.user = owner;
          const roomCreated = await queryRunner.manager.save(roomInstance)

          let membersToCreated: RoomsMembers[] = []
          await members.forEach((member:RoomsMembers) => {
            member.rooms = roomCreated
            membersToCreated = [...membersToCreated, member]
          })
          console.log('MEMBER TO CREATED-->', membersToCreated);
          membersToCreated.forEach(async (member) => {
             await queryRunner.manager.save(RoomsMembers, member)
          })
     
          await queryRunner.commitTransaction();
         respon = {roomCreated}
         return respon;
    
     } catch (error) {
         console.log('Error tratando de crear orden de solidos-->', error)
         err = error;
         await queryRunner.rollbackTransaction();
     } finally {
         await queryRunner.release();
     }
     if (err) throw new InternalServerErrorException(err);
       }

    public async getRomAllData(roomId: string){
      console.log('this is the RoomId-->', roomId)
      const queryReturn = await this.createQueryBuilder('o')
      .select([
        `o.id as id`,
        `o.name as roomName`,
        `usr.full_name as ownerFullName`,
        `usr.id as userOwnerId`,
        `usr.nikename as ownerNickName`, 
      ])
      .innerJoin('o.user', 'usr')
      .where('o.id = :id', { id: roomId })
      .getRawOne();
      return queryReturn;
    }
}
