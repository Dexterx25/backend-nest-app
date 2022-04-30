import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { RoomsMembers } from "src/database/entities";
import { RoomsRepository, RoomMemberRepository} from "src/database/repositories/index";
import { UserRepository } from "src/database/repositories/users";
import { MemberOutPutDTO } from "src/utils/dto/output/membersRoom";

@Injectable()
export class RoomsService {
  constructor(private readonly roomsRepository: RoomsRepository, private readonly userRepository: UserRepository, private readonly memberRepository: RoomMemberRepository) {}
 
  public async getRoom(id: string){
    const roomFound = await this.roomsRepository.getRomAllData(id);
    if(!roomFound)throw new NotFoundException('Sala no encontrada');
    const roomReturn = {
      ...roomFound,
      members: await this.listMembersRoom(roomFound.id)
    }
    return roomReturn
   };
   
  public async listAllRoomsDB(){
      return await this.roomsRepository.find()
  };

  public async listAllRoomsByUserId(userId: string){
    console.log('this is the userId for list rooms byUserId-->', userId)
    return await this.roomsRepository.find({where:{user: userId}, relations:["user"]})
   };

  public async listMembersRoom (roomId: string) {
          const roomFound = await this.roomsRepository.findOne({where: {id: roomId}})
          if(!roomFound)throw new NotFoundException('Sala no encontrada');

          const membersFound = await this.memberRepository.find({where:{rooms:roomFound}, relations:['user']})
          const membersParametrized = membersFound.reduce((acc: MemberOutPutDTO[], item:RoomsMembers) => {
            const {user, rooms, ...rest} = item
            const {email, full_name, nikename, lastnames, names,  id} = user
            acc.push({
               email, 
               userId:id,
               full_name, 
               lastnames, 
               names, 
               memberId:rest.id, 
               nikename
            })
            return acc
          },[])
          return membersParametrized
  }

  public async createRoomByUserId(members: string[], userId:string, nameRoom: string){
    const userOwnerFound = await this.userRepository.findOne({where:{id:userId}})
    console.log('THIS IS THE members-->', members)
    if(!userOwnerFound)throw new NotFoundException('Usuario anfitrion no encontrado')
    const ownerIntance = await this.userRepository.create(userOwnerFound)

    const membersUsersCreated: any[] = []
    await members.forEach(async member => {
      const userFound = await this.userRepository.findOne({where:{id:member}})
        console.log('member Found-->', userFound)
      if(!userFound)throw new NotFoundException('Usuario miembro no encontrado') 
      if(userFound.id === userOwnerFound.id) throw new BadRequestException('No puedes añadirte como un miembro porque ya eres al crear la sala')
      const memberInstance = await this.memberRepository.create({id: userFound.id, user: userFound})
      console.log('memberInstance created-->', memberInstance);
      await membersUsersCreated.push(memberInstance)   
    })
    console.log('members to create-->', membersUsersCreated)
    const responCreate = await this.roomsRepository.createRoomWithOwnerAndMembers(membersUsersCreated, ownerIntance, nameRoom)
    return responCreate
   }
};

